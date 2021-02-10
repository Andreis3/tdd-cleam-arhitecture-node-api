import { IHashComparer } from '../../../../../src/data/protocols/cryptography/IHashComparer';
import { ITokenGenerator } from '../../../../../src/data/protocols/cryptography/ITokenGenerator';
import { ILoadAccountByEmailRepository } from '../../../../../src/data/protocols/db/ILoadAccountByEmailRepository';
import { IUpdateAccessTokenRepository } from '../../../../../src/data/protocols/db/IUpdateAccessTokenRepository';
import { DbAuthentication } from '../../../../../src/data/use-cases/authentication/DbAuthenticate';
import { IAccountModel } from '../../../../../src/domain/models/account';
import { IAuthenticationModel } from '../../../../../src/domain/use-cases/IAuthentication';

const makeFakeAccount = (): IAccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
});

const makeFakeAuthentication = (): IAuthenticationModel => ({
    email: 'any_email@mail.com',
    password: 'any_password',
});

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
        async load(email: string): Promise<IAccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()));
        }
    }
    return new LoadAccountByEmailRepositoryStub();
};

const makeHashComparer = (): IHashComparer => {
    class HashComparerStub implements IHashComparer {
        async compare(value: string, hash: string): Promise<boolean> {
            return new Promise(resolve => resolve(true));
        }
    }
    return new HashComparerStub();
};

const makeTokenGenerator = (): ITokenGenerator => {
    class TokenGeneratorStub implements ITokenGenerator {
        async generate(id: string): Promise<string> {
            return new Promise(resolve => resolve('any_token'));
        }
    }
    return new TokenGeneratorStub();
};

const makeUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
        async update(id: string, token: string): Promise<void> {
            return new Promise(resolve => resolve());
        }
    }
    return new UpdateAccessTokenRepositoryStub();
};

interface ISutTypes {
    sut: DbAuthentication;
    loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository;
    hashComparerStub: IHashComparer;
    tokenGeneratorStub: ITokenGenerator;
    updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository;
}

const makeSut = (): ISutTypes => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
    const hashComparerStub = makeHashComparer();
    const tokenGeneratorStub = makeTokenGenerator();
    const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository();
    const sut = new DbAuthentication(
        loadAccountByEmailRepositoryStub,
        hashComparerStub,
        tokenGeneratorStub,
        updateAccessTokenRepositoryStub,
    );
    return {
        sut,
        hashComparerStub,
        tokenGeneratorStub,
        updateAccessTokenRepositoryStub,
        loadAccountByEmailRepositoryStub,
    };
};

describe('DbAuthentication Usecase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
        await sut.auth(makeFakeAuthentication());

        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
    });

    test('Should throw if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())),
        );
        const promise = sut.auth(makeFakeAuthentication());

        await expect(promise).rejects.toThrow();
    });

    test('Should return null if LoadAccountByEmailRepository returns null', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null);
        const accessToken = await sut.auth(makeFakeAuthentication());

        expect(accessToken).toBeNull();
    });

    test('Should call HasComparer with correct values', async () => {
        const { sut, hashComparerStub } = makeSut();
        const compareSpy = jest.spyOn(hashComparerStub, 'compare');
        await sut.auth(makeFakeAuthentication());

        expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password');
    });

    test('Should throw if HasComparer throws', async () => {
        const { sut, hashComparerStub } = makeSut();
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())),
        );
        const promise = sut.auth(makeFakeAuthentication());

        await expect(promise).rejects.toThrow();
    });

    test('Should return null if HasComparer returns false', async () => {
        const { sut, hashComparerStub } = makeSut();
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)));
        const accessToken = await sut.auth(makeFakeAuthentication());

        expect(accessToken).toBeNull();
    });

    test('Should call TokenGenerator with correct id', async () => {
        const { sut, tokenGeneratorStub } = makeSut();
        const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate');
        await sut.auth(makeFakeAuthentication());

        expect(generateSpy).toHaveBeenCalledWith('any_id');
    });

    test('Should throw if TokenGenerator throws', async () => {
        const { sut, tokenGeneratorStub } = makeSut();
        jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())),
        );
        const promise = sut.auth(makeFakeAuthentication());

        await expect(promise).rejects.toThrow();
    });

    test('Should call TokenGenerator with correct id', async () => {
        const { sut } = makeSut();
        const accessToken = await sut.auth(makeFakeAuthentication());

        expect(accessToken).toBe('any_token');
    });

    test('Should call UpdateAccessTokenRepository with correct values', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update');
        await sut.auth(makeFakeAuthentication());

        expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
    });

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut();
        jest.spyOn(updateAccessTokenRepositoryStub, 'update').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())),
        );
        const promise = sut.auth(makeFakeAuthentication());

        await expect(promise).rejects.toThrow();
    });
});
