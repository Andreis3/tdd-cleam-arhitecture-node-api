import { IAccountModel } from '@/domain/models/account/IAccountModel';

export interface ILoadAccountByToken {
    load(accessToken: string, role?: string): Promise<IAccountModel>;
}
