import {
    IAuthentication,
    IAuthenticationModel,
    IHashComparer,
    IEncrypter,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository,
} from './DbAuthenticationProtocols';

export class DbAuthentication implements IAuthentication {
    constructor(
        private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
        private readonly hashComparer: IHashComparer,
        private readonly encrypter: IEncrypter,
        private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository,
    ) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
        this.updateAccessTokenRepository = updateAccessTokenRepository;
    }

    async auth(authentication: IAuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password);
            if (isValid) {
                const accessToken = await this.encrypter.encrypt(account.id);
                await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken);
                return accessToken;
            }
        }
        return null;
    }
}
