import { IAddAccountModel } from '../../../../domain/use-cases/IAddAccount';
import { IAccountModel } from '../../../../domain/models/AccountModel';

export interface IAddAccountRepository {
    add(account: IAddAccountModel): Promise<IAccountModel>;
}
