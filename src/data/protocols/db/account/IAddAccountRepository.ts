import { IAddAccountModel } from '@/domain/use-cases/IAddAccount';
import { IAccountModel } from '@/domain/models/IAccountModel';

export interface IAddAccountRepository {
    add(account: IAddAccountModel): Promise<IAccountModel>;
}
