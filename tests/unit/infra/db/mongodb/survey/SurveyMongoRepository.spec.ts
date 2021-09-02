import MockDate from 'mockdate';

import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelpers';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';
import { Collection } from 'mongodb';

let surveyCollection: Collection;

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
    });

    const makeSut = (): SurveyMongoRepository => {
        return new SurveyMongoRepository();
    };

    describe('add', () => {
        test('Should add a survey on add success', async () => {
            const sut = makeSut();
            await sut.add({
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

            const survey = await surveyCollection.findOne({ question: 'any_question' });
            expect(survey).toBeTruthy();
        });
    });

    describe('loadAll', () => {
        test('Should loadAll a surveys on add success', async () => {
            await surveyCollection.insertMany([
                {
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
                },
                {
                    question: 'any_question_2',
                    answers: [
                        {
                            image: 'any_image_2',
                            answer: 'any_answer_2',
                        },
                        {
                            answer: 'other_answer_2',
                        },
                    ],
                    date: new Date(),
                },
            ]);
            const sut = makeSut();
            const surveys = await sut.loadAll();

            expect(surveys.length).toBe(2);
            expect(surveys[0].question).toBe('any_question');
            expect(surveys[1].question).toBe('any_question_2');
        });

        test('Should loadAll empty list', async () => {
            const sut = makeSut();
            const surveys = await sut.loadAll();

            expect(surveys.length).toBe(0);
        });
    });
});
