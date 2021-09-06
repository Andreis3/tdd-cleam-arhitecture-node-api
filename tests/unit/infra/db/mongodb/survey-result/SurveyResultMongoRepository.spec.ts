import MockDate from 'mockdate';

import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelpers';
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/SurveyResultMongoRepository';
import { Collection } from 'mongodb';
import { ISurveyModel } from '@/domain/models/ISurveyModel';
import { IAccountModel } from '@/domain/models/IAccountModel';

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSurvey = async (): Promise<ISurveyModel> => {
    const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
            {
                image: 'any_image',
                answer: 'any_answer',
            },
            {
                answer: 'other_answer',
            },
        ],
        date: new Date(),
    });

    return res.ops[0];
};

const makeAccount = async (): Promise<IAccountModel> => {
    const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
    });

    return res.ops[0];
};

describe('Survey Mongo Repository', () => {
    beforeAll(async () => {
        MockDate.set(new Date());
        await MongoHelper.connect(process.env.MONGO_URL);
    });
    afterAll(async () => {
        MockDate.reset();
        await MongoHelper.disconnect();
    });
    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('survey');
        await surveyCollection.deleteMany({});
        surveyResultCollection = await MongoHelper.getCollection('surveyResult');
        await surveyResultCollection.deleteMany({});
        accountCollection = await MongoHelper.getCollection('accounts');
        await accountCollection.deleteMany({});
    });

    const makeSut = (): SurveyResultMongoRepository => {
        return new SurveyResultMongoRepository();
    };

    describe('save', () => {
        test('Should add a survey result its new', async () => {
            const survey = await makeSurvey();
            const account = await makeAccount();
            const sut = makeSut();
            const surveyResult = await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[0].answer,
                date: new Date(),
            });

            expect(surveyResult).toBeTruthy();
            expect(surveyResult.id).toBeTruthy();
            expect(surveyResult.answer).toBe(survey.answers[0].answer);
        });

        test('Should update a survey result its not new', async () => {
            const survey = await makeSurvey();
            const account = await makeAccount();
            const sut = makeSut();
            const res = await surveyResultCollection.insertOne({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[0].answer,
                date: new Date(),
            });
            const surveyResultUpdate = await sut.save({
                surveyId: survey.id,
                accountId: account.id,
                answer: survey.answers[1].answer,
                date: new Date(),
            });

            expect(surveyResultUpdate).toBeTruthy();
            expect(surveyResultUpdate.id).toEqual(res.ops[0]._id);
            expect(surveyResultUpdate.answer).toBe(survey.answers[1].answer);
        });
    });
});
