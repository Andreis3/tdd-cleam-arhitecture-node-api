import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';
import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelpers';
import app from '@/main/config/App';
import env from '@/main/config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccessToken = async (): Promise<string> => {
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

    return accessToken;
};

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
            const accessToken = await makeAccessToken();

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
            await request(app).get('/api/surveys').expect(403);
        });

        test('Should return 200 on load survey with valid accessToken', async () => {
            const accessToken = await makeAccessToken();

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
            ]);

            await request(app).get('/api/surveys').set('x-access-token', accessToken).expect(200);
        });

        test('Should return 204 on load survey with valid accessToken', async () => {
            const accessToken = await makeAccessToken();

            await request(app).get('/api/surveys').set('x-access-token', accessToken).expect(204);
        });
    });
});
