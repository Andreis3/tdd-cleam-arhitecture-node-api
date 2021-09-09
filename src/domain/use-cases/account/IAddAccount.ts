import { IAccountModel } from '@/domain/models/account/IAccountModel';

export interface IAddAccountModel {
    name: string;
    email: string;
    password: string;
}
export interface IAddAccount {
    add(account: IAddAccountModel): Promise<IAccountModel>;
}