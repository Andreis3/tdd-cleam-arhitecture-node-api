import { Collection } from 'mongodb';
import request from 'supertest';
import { MongoHelper } from '../../../../src/infra/db/mongodb/helpers/MongoHelpers';
import app from '../../../../src/main/config/App';

let surveyCollection: Collection;

describe('Survey Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });
    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('survey');
        await surveyCollection.deleteMany({});
    });

    describe('POST /survey', () => {
        test('Should return 204 on add survey success', async () => {
            await request(app)
                .post('/api/survey')
                .send({
                    question: 'Question',
                    answers: [
                        {
                            answer: 'Answer 1',
                            image: 'http://image-name.com',
                        },
                        {
                            answer: 'Answer 2',
                        },
                    ],
                })
                .expect(204);
        });
    });
});
