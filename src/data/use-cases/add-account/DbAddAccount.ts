import { IAddAccount, IAddAccountModel, IAccountModel, IHasher, IAddAccountRepository } from './DbAccountProtocols';

export class DbAddAccount implements IAddAccount {
    constructor(private readonly hasher: IHasher, private readonly addAccountRepository: IAddAccountRepository) {
        this.hasher = hasher;
        this.addAccountRepository = addAccountRepository;
    }

    async add(accountData: IAddAccountModel): Promise<IAccountModel> {
        const hashedPassword = await this.hasher.hash(accountData.password);

        const account = await this.addAccountRepository.add(
            Object.assign({}, accountData, { password: hashedPassword }),
        );

        return account;
    }
}
