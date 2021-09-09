import { IAddAccountModel } from '@/domain/use-cases/account/IAddAccount';
import { IAccountModel } from '@/domain/models/account/IAccountModel';

export interface IAddAccountRepository {
    add(account: IAddAccountModel): Promise<IAccountModel>;
}
