import { ILoadAccountByToken } from '../../../domain/use-cases/ILoadAccountByToken';
import { IDecrypter } from '../../protocols/cryptography/IDecrypter';
import { IAccountModel } from '../add-account/DbAccountProtocols';

export class DbLoadAccountByToken implements ILoadAccountByToken {
    constructor(private readonly decrypter: IDecrypter) {}

    async load(accessToken: string, role?: string): Promise<IAccountModel> {
        await this.decrypter.decrypt(accessToken);
        return null;
    }
}
