import { forbidden, ok } from '../../../../src/presentation/helpers/http/HttpHelpers';
import { AccessDeniedError } from '../../../../src/presentation/errors';
import { AuthMiddleware } from '../../../../src/presentation/middleware/AuthMiddleware';
import { ILoadAccountByToken } from '../../../../src/domain/use-cases/ILoadAccountByToken';
import { IAccountModel } from '../../../../src/domain/models/IAccountModel';
import { IHttpRequest } from '../../../../src/presentation/protocols';

const makeFakeAccount = (): IAccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
});

const makeFakeRequest = (): IHttpRequest => ({
    headers: {
        'x-access-token': 'any_token',
    },
});

interface ISutTypes {
    sut: AuthMiddleware;
    loadAccountByTokenStub: ILoadAccountByToken;
}

const makeLoadAccountByToken = (): ILoadAccountByToken => {
    class LoadAccountByTokenStub implements ILoadAccountByToken {
        async load(accessToken: string, role?: string): Promise<IAccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()));
        }
    }

    return new LoadAccountByTokenStub();
};

const makeSut = (): ISutTypes => {
    const loadAccountByTokenStub = makeLoadAccountByToken();

    const sut = new AuthMiddleware(loadAccountByTokenStub);

    return {
        sut,
        loadAccountByTokenStub,
    };
};

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut();

        const httpResponse = await sut.handle({});

        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });

    test('Should loadAccountByToken with correct accessToken', async () => {
        const { sut, loadAccountByTokenStub } = makeSut();

        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');

        await sut.handle(makeFakeRequest());

        expect(loadSpy).toHaveBeenCalledWith('any_token');
    });

    test('Should return 403 if LoadAccountByToken returns null', async () => {
        const { sut, loadAccountByTokenStub } = makeSut();

        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValue(new Promise(resolve => resolve(null)));

        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });

    test('Should return 200 if LoadAccountByToken returns an account', async () => {
        const { sut } = makeSut();

        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse).toEqual(ok({ accountId: 'any_id' }));
    });
});
