import { IAddAccount, IAddAccountModel } from '../../../domain/use-cases/IAddAccount';
import { IAccountModel } from '../../../domain/models/account';
import { IEncrypter } from '../../protocols/IEncrypter';

export class DbAddAccount implements IAddAccount {
    private readonly encrypter: IEncrypter;
    constructor(encrypter: IEncrypter) {
        this.encrypter = encrypter;
    }

    async add(account: IAddAccountModel): Promise<IAccountModel> {
        await this.encrypter.encrypt(account.password);
        return await new Promise((resolve) => resolve(null));
    }
}
