import MockDate from 'mockdate';

import { MongoHelper } from '../../../../../../src/infra/db/mongodb/helpers/MongoHelpers';
import { SurveyMongoRepository } from '../../../../../../src/infra/db/mongodb/survey/SurveyMongoRepository';
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
});
