import { IAddAccountRepository } from '../../../../data/protocols/db/IAddAccountRepository';
import { IAddAccountModel } from '../../../../domain/use-cases/IAddAccount';
import { IAccountModel } from '../../../../domain/models/account';
import { MongoHelper } from '../helpers/mongoHelpers';
import { ILoadAccountByEmailRepository } from '../../../../data/use-cases/authentication/DbAuthenticationProtocols';

export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountByEmailRepository {
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
}
