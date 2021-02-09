import { IAuthentication, IAuthenticationModel } from '../../../domain/use-cases/IAuthentication';
import { ILoadAccountByEmailRepository } from '../../protocols/ILoadAccountByEmailRepository';

export class DbAuthentication implements IAuthentication {
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository;

    constructor(loadAccountByEmailRepository: ILoadAccountByEmailRepository) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    }

    async auth(authentication: IAuthenticationModel): Promise<string> {
        await this.loadAccountByEmailRepository.load(authentication.email);
        return null;
    }
}
