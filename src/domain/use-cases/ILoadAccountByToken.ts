import { IAccountModel } from '../models/IAccountModel';

export interface ILoadAccountByToken {
    load(accessToken: string, role?: string): Promise<IAccountModel>;
}
