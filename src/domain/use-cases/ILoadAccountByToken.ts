import { IAccountModel } from '@/domain/models/IAccountModel';

export interface ILoadAccountByToken {
    load(accessToken: string, role?: string): Promise<IAccountModel>;
}
