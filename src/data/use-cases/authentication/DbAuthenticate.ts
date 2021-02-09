import { IAuthentication, IAuthenticationModel } from '../../../domain/use-cases/IAuthentication';
import { IHashComparer } from '../../protocols/cryptography/IHashComparer';
import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository';

export class DbAuthentication implements IAuthentication {
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository;
    private readonly hashComparer: IHashComparer;

    constructor(loadAccountByEmailRepository: ILoadAccountByEmailRepository, hashComparer: IHashComparer) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
        this.hashComparer = hashComparer;
    }

    async auth(authentication: IAuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.load(authentication.email);
        if (account) {
            await this.hashComparer.compare(authentication.password, account.password);
        }
        return null;
    }
}
