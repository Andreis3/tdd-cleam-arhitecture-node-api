import { IAddAccountRepository } from '@/data/protocols/db/account/IAddAccountRepository';
import { IAddAccountModel } from '@/domain/use-cases/account/IAddAccount';
import { IAccountModel } from '@/domain/models/account/IAccountModel';
import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelpers';
import {
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository,
} from '@/data/use-cases/account/authentication/DbAuthenticationProtocols';
import { ILoadAccountByTokenRepository } from '@/data/protocols/db/account/ILoadAccountByTokenRepository';

export class AccountMongoRepository
    implements
        IAddAccountRepository,
        ILoadAccountByEmailRepository,
        IUpdateAccessTokenRepository,
        ILoadAccountByTokenRepository
{
    async add(accountData: IAddAccountModel): Promise<IAccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts');
        const result = await accountCollection.insertOne(accountData);
        const account = result.ops[0];
        return MongoHelper.map(account);
    }

    async loadByEmail(email: string): Promise<IAccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts');
        const account = await accountCollection.findOne({ email });

        return account && MongoHelper.map(account);
    }

    async updateAccessToken(id: string, token: string): Promise<void> {
        const accountCollection = await MongoHelper.getCollection('accounts');

        await accountCollection.updateOne({ _id: id }, { $set: { accessToken: token } });
    }

    async loadByToken(token: string, role?: string): Promise<IAccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts');
        const account = await accountCollection.findOne({
            accessToken: token,
            $or: [
                {
                    role,
                },
                { role: 'admin' },
            ],
        });

        return account && MongoHelper.map(account);
    }
}
