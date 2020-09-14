import { IAddAccountRepository } from '../../../../data/protocols/IAddAccountRepository';
import { IAddAccountModel } from '../../../../domain/use-cases/IAddAccount';
import { IAccountModel } from '../../../../domain/models/account';
import { MongoHelper } from '../helpers/mongoHelpers';

export class AccountMongoRepository implements IAddAccountRepository {
    async add(accountData: IAddAccountModel): Promise<IAccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts');
        const result = await accountCollection.insertOne(accountData);
        const account = result.ops[0];
        return MongoHelper.map(account);
    }
}
