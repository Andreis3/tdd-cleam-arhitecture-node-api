import {
    IAddAccount,
    IAddAccountModel,
    IAccountModel,
    IHasher,
    IAddAccountRepository,
    ILoadAccountByEmailRepository,
} from '@/data/use-cases/add-account/DbAccountProtocols';

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
        const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email);
        if (!account) {
            const hashedPassword = await this.hasher.hash(accountData.password);
            const newAccount = await this.addAccountRepository.add(
                Object.assign({}, accountData, { password: hashedPassword }),
            );
            return newAccount;
        }
        return null;
    }
}
