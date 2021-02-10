import { IAuthentication, IAuthenticationModel } from '../../../domain/use-cases/IAuthentication';
import { IHashComparer } from '../../protocols/cryptography/IHashComparer';
import { ITokenGenerator } from '../../protocols/cryptography/ITokenGenerator';
import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository';

export class DbAuthentication implements IAuthentication {
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository;
    private readonly hashComparer: IHashComparer;
    private readonly tokenGenerator: ITokenGenerator;

    constructor(
        loadAccountByEmailRepository: ILoadAccountByEmailRepository,
        hashComparer: IHashComparer,
        tokenGenerator: ITokenGenerator,
    ) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
        this.hashComparer = hashComparer;
        this.tokenGenerator = tokenGenerator;
    }

    async auth(authentication: IAuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.load(authentication.email);
        if (account) {
            await this.hashComparer.compare(authentication.password, account.password);
            await this.tokenGenerator.generate(account.id);
        }
        return null;
    }
}
