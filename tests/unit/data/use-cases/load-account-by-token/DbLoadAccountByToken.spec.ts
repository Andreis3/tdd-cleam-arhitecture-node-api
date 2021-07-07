import { DbLoadAccountByToken } from '../../../../../src/data/use-cases/load-account-by-token/DbLoadAccountByToken';
import { IDecrypter } from '../../../../../src/data/protocols/cryptography/IDecrypter';
import { ILoadAccountByTokenRepository } from '../../../../../src/data/protocols/db/account/ILoadAccountByTokenRepository';
import { IAccountModel } from '../../../../../src/domain/models/IAccountModel';

const makeFakeAccount = (): IAccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
});

const makeDecrypter = (): IDecrypter => {
    class DecrypterStub implements IDecrypter {
        async decrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('any_value'));
        }
    }

    return new DecrypterStub();
};

const makeLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
        async loadByToken(token: string, role?: string): Promise<IAccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()));
        }
    }

    return new LoadAccountByTokenRepositoryStub();
};

interface ISutTypes {
    sut: DbLoadAccountByToken;
    decrypterStub: IDecrypter;
    loadAccountByTokenRepositoryStub: ILoadAccountByTokenRepository;
}

const makeSut = (): ISutTypes => {
    const decrypterStub = makeDecrypter();
    const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository();
    const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub);

    return {
        sut,
        decrypterStub,
        loadAccountByTokenRepositoryStub,
    };
};

describe('DbLoadAccountByToken Usecase', () => {
    test('Should call Decrypter with correct values', async () => {
        const { sut, decrypterStub } = makeSut();

        const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt');
        await sut.load('any_token', 'any_role');

        expect(decrypterSpy).toHaveBeenCalledWith('any_token');
    });

    test('Should return null if Decrypter returns null', async () => {
        const { sut, decrypterStub } = makeSut();

        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const account = await sut.load('any_token');

        expect(account).toBeNull();
    });

    test('Should call LoadAccountByTokenRepository with correct values', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut();

        const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken');
        await sut.load('any_token', 'any_role');

        expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
    });

    test('Should return null if Decrypter returns null', async () => {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut();

        jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(
            new Promise(resolve => resolve(null)),
        );
        const account = await sut.load('any_token', 'any_role');

        expect(account).toBeNull();
    });
});
