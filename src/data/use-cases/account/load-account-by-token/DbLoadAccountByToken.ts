import { ILoadAccountByToken } from '../../../../domain/use-cases/account/ILoadAccountByToken';
import { IDecrypter } from '../../../protocols/cryptography/IDecrypter';
import { ILoadAccountByTokenRepository } from '../../../protocols/db/account/ILoadAccountByTokenRepository';
import { IAccountModel } from '../add-account/DbAccountProtocols';

export class DbLoadAccountByToken implements ILoadAccountByToken {
    constructor(
        private readonly decrypter: IDecrypter,
        private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository,
    ) {}

    async load(accessToken: string, role?: string): Promise<IAccountModel> {
        const accessTokenDecrypted = await this.decrypter.decrypt(accessToken);

        if (accessTokenDecrypted) {
            const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role);
            return !account ? null : account;
        }

        return null;
    }
}
