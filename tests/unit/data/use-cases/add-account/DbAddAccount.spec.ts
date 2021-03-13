import { DbAddAccount } from '../../../../../src/data/use-cases/add-account/DbAddAccount';
import {
    IHasher,
    IAccountModel,
    IAddAccountModel,
    IAddAccountRepository,
    ILoadAccountByEmailRepository,
} from '../../../../../src/data/use-cases/add-account/DbAccountProtocols';

const makeFakeAccount = (): IAccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
});

const makeHasher = (): IHasher => {
    class HasherStub implements IHasher {
        async hash(value: string): Promise<string> {
            return await new Promise(resolve => resolve('hashed_password'));
        }
    }
    return new HasherStub();
};

const makeAddAccountRepositoryStub = (): IAddAccountRepository => {
    class AddAccountRepositoryStub implements IAddAccountRepository {
        async add(account: IAddAccountModel): Promise<IAccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_@email.com',
                password: 'hashed_password',
            };
            return await new Promise(resolve => resolve(fakeAccount));
        }
    }
    return new AddAccountRepositoryStub();
};

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
        async loadByEmail(email: string): Promise<IAccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()));
        }
    }
    return new LoadAccountByEmailRepositoryStub();
};

interface ISutTypes {
    sut: DbAddAccount;
    hasherStub: IHasher;
    addAccountRepositoryStub: IAddAccountRepository;
    loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository;
}

const makeSut = (): ISutTypes => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
    const hasherStub = makeHasher();
    const addAccountRepositoryStub = makeAddAccountRepositoryStub();
    const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub);
    return {
        sut,
        hasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub,
    };
};
describe('DbAddAccount Usecase', () => {
    test('should call Encrypter with correct password', async () => {
        const { sut, hasherStub } = makeSut();
        const hashSpy = jest.spyOn(hasherStub, 'hash');
        const accountData = {
            name: 'valid_name',
            email: 'valid_@email.com',
            password: 'valid_password',
        };

        await sut.add(accountData);
        expect(hashSpy).toHaveBeenCalledWith('valid_password');
    });

    test('should throw if Encrypter throws', async () => {
        const { sut, hasherStub } = makeSut();
        jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const accountData = {
            name: 'valid_name',
            email: 'valid_@email.com',
            password: 'valid_password',
        };

        const promise = sut.add(accountData);
        await expect(promise).rejects.toThrow();
    });

    test('should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
        const accountData = {
            name: 'valid_name',
            email: 'valid_@email.com',
            password: 'valid_password',
        };

        await sut.add(accountData);
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_@email.com',
            password: 'hashed_password',
        });
    });

    test('should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())),
        );
        const accountData = {
            name: 'valid_name',
            email: 'valid_@email.com',
            password: 'valid_password',
        };

        const promise = sut.add(accountData);
        await expect(promise).rejects.toThrow();
    });

    test('should returns an account on success', async () => {
        const { sut } = makeSut();
        const accountData = {
            name: 'valid_name',
            email: 'valid_@email.com',
            password: 'valid_password',
        };

        const account = await sut.add(accountData);
        expect(account).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_@email.com',
            password: 'hashed_password',
        });
    });

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
        const accountData = {
            name: 'valid_name',
            email: 'valid_@email.com',
            password: 'valid_password',
        };

        await await sut.add(accountData);

        expect(loadSpy).toHaveBeenCalledWith('valid_@email.com');
    });
});
