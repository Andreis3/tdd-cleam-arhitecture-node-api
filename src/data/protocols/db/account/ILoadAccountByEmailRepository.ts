import { IAccountModel } from '@/domain/models/account/IAccountModel';

export interface ILoadAccountByEmailRepository {
    loadByEmail(email: string): Promise<IAccountModel>;
}
