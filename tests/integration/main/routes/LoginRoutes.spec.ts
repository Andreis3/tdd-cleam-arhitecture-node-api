import { Collection } from 'mongodb';
import request from 'supertest';
import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelpers';
import app from '@/main/config/App';
import { hash } from 'bcrypt';

let accountCollection: Collection;

describe('Login Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });
    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection('accounts');
        await accountCollection.deleteMany({});
    });

    describe('POST /signup', () => {
        test('Should return 200 on signup', async () => {
            await request(app)
                .post('/api/signup')
                .send({
                    name: 'Test_name',
                    email: 'test_email@email.com',
                    password: '123456',
                    passwordConfirmation: '123456',
                })
                .expect(201);
        });
    });

    describe('POST /login', () => {
        test('Should return 200 on login', async () => {
            const password = await hash('123', 12);
            await accountCollection.insertOne({
                name: 'Test_name',
                email: 'test_email@email.com',
                password,
            });
            await request(app)
                .post('/api/login')
                .send({
                    email: 'test_email@email.com',
                    password: '123',
                })
                .expect(200);
        });

        test('Should return 401 on login', async () => {
            await request(app)
                .post('/api/login')
                .send({
                    email: 'test_email@email.com',
                    password: '123',
                })
                .expect(401);
        });
    });
});
