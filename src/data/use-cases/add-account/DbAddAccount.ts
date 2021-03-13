import {
    IAddAccount,
    IAddAccountModel,
    IAccountModel,
    IHasher,
    IAddAccountRepository,
    ILoadAccountByEmailRepository,
} from './DbAccountProtocols';

export class DbAddAccount implements IAddAccount {
    constructor(
        private readonly hasher: IHasher,
        private readonly addAccountRepository: IAddAccountRepository,
        private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    ) {
        this.hasher = hasher;
        this.addAccountRepository = addAccountRepository;
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    }

    async add(accountData: IAddAccountModel): Promise<IAccountModel> {
        await this.loadAccountByEmailRepository.loadByEmail(accountData.email);

        const hashedPassword = await this.hasher.hash(accountData.password);

        const account = await this.addAccountRepository.add(
            Object.assign({}, accountData, { password: hashedPassword }),
        );

        return account;
    }
}
