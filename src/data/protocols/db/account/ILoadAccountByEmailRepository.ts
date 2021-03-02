import { IAccountModel } from '../../../../domain/models/AccountModel';

export interface ILoadAccountByEmailRepository {
    loadByEmail(email: string): Promise<IAccountModel>;
}
