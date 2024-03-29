import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelpers';
import { AccountMongoRepository } from '@/infra/db/mongodb/account/AccountMongoRepository';
import { Collection } from 'mongodb';

let accountCollection: Collection;

describe('account Mongo Repository', () => {
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
    describe('aadd()', () => {
        test('Should return an account on add success', async () => {
            const sut = new AccountMongoRepository();
            const account = await sut.add({
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
            });

            expect(account).toBeTruthy();
            expect(account.id).toBeTruthy();
            expect(account.name).toBe('any_name');
            expect(account.email).toBe('any_email@mail.com');
            expect(account.password).toBe('any_password');
        });
    });

    describe('loadByEmail()', () => {
        test('Should return an account on loadByEmail success', async () => {
            const sut = new AccountMongoRepository();
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
            });
            const account = await sut.loadByEmail('any_email@mail.com');

            expect(account).toBeTruthy();
            expect(account.id).toBeTruthy();
            expect(account.name).toBe('any_name');
            expect(account.email).toBe('any_email@mail.com');
            expect(account.password).toBe('any_password');
        });

        test('Should return null if loadByEmail fails', async () => {
            const sut = new AccountMongoRepository();

            const account = await sut.loadByEmail('any_email@mail.com');

            expect(account).toBeFalsy();
        });
    });

    describe('updateAccessToken()', () => {
        test('Should update the account on updateAccessToken success', async () => {
            const sut = new AccountMongoRepository();
            const res = await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
            });

            expect(res.ops[0].accessToken).toBeFalsy();

            await sut.updateAccessToken(res.ops[0]._id, 'any_token');

            const account = await accountCollection.findOne({ _id: res.ops[0]._id });

            expect(account).toBeTruthy();
            expect(account.accessToken).toBe('any_token');
        });
    });

    describe('loadByToken()', () => {
        test('Should return an account on loadByToken without role', async () => {
            const sut = new AccountMongoRepository();
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                accessToken: 'any_token',
            });
            const account = await sut.loadByToken('any_token');

            expect(account).toBeTruthy();
            expect(account.id).toBeTruthy();
            expect(account.name).toBe('any_name');
            expect(account.email).toBe('any_email@mail.com');
            expect(account.password).toBe('any_password');
        });

        test('Should return an account on loadByToken with admin role', async () => {
            const sut = new AccountMongoRepository();
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                accessToken: 'any_token',
                role: 'admin',
            });
            const account = await sut.loadByToken('any_token', 'admin');

            expect(account).toBeTruthy();
            expect(account.id).toBeTruthy();
            expect(account.name).toBe('any_name');
            expect(account.email).toBe('any_email@mail.com');
            expect(account.password).toBe('any_password');
        });

        test('Should return an account on loadByToken with a user of type admin', async () => {
            const sut = new AccountMongoRepository();
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                accessToken: 'any_token',
                role: 'admin',
            });
            const account = await sut.loadByToken('any_token');

            expect(account).toBeTruthy();
            expect(account.id).toBeTruthy();
            expect(account.name).toBe('any_name');
            expect(account.email).toBe('any_email@mail.com');
            expect(account.password).toBe('any_password');
        });

        test('Should return an account on loadByToken with invalid role', async () => {
            const sut = new AccountMongoRepository();
            await accountCollection.insertOne({
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                accessToken: 'any_token',
            });
            const account = await sut.loadByToken('any_token', 'admin');

            expect(account).toBeFalsy();
        });

        test('Should return null if loadByToken fails', async () => {
            const sut = new AccountMongoRepository();

            const account = await sut.loadByToken('any_token');

            expect(account).toBeFalsy();
        });
    });
});
