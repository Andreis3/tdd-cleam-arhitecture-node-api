import { IAccountModel } from '@/domain/models/account/IAccountModel';

export interface ILoadAccountByTokenRepository {
    loadByToken(token: string, role?: string): Promise<IAccountModel>;
}
