import { IAddAccountModel } from '../../../domain/use-cases/IAddAccount';
import { IAccountModel } from '../../../domain/models/account';

export interface IAddAccountRepository {
    add(account: IAddAccountModel): Promise<IAccountModel>;
}
