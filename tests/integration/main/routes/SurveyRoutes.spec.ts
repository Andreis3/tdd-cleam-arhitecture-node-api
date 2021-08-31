import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';
import { MongoHelper } from '../../../../src/infra/db/mongodb/helpers/MongoHelpers';
import app from '../../../../src/main/config/App';
import env from '../../../../src/main/config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
});
afterAll(async () => {
    await MongoHelper.disconnect();
});
beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('survey');
    await surveyCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('accounts');
    await surveyCollection.deleteMany({});
});

describe('Main :: Routes :: SurveyRoutes', () => {
    describe('POST :: /survey', () => {
        test('Should return 403 on add survey without accessToken', async () => {
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
                .expect(403);
        });

        test('Should return 204 on add survey with valid accessToken', async () => {
            const res = await accountCollection.insertOne({
                name: 'Andrei',
                email: 'andrei.santos@test.com',
                password: '123',
                role: 'admin',
            });

            const id = res.ops[0]._id;
            const accessToken = sign({ id }, env.jwtSecret);
            await accountCollection.updateOne(
                {
                    _id: id,
                },
                {
                    $set: { accessToken },
                },
            );

            await request(app)
                .post('/api/survey')
                .set('x-access-token', accessToken)
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

    describe('GET :: /surveys', () => {
        test('Should return 403 on load survey without accessToken', async () => {
            await request(app).get('/api/survey').expect(403);
        });
    });
});
