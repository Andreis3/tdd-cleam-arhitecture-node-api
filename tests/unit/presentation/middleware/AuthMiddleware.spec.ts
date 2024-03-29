import { forbidden, ok, serverError } from '@/presentation/helpers/http/HttpHelpers';
import { AccessDeniedError } from '@/presentation/errors';
import { AuthMiddleware } from '@/presentation/middleware/AuthMiddleware';
import { ILoadAccountByToken, IHttpRequest, IAccountModel } from '@/presentation/middleware/AuthMiddlewareProtocols';

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

const makeSut = (role?: string): ISutTypes => {
    const loadAccountByTokenStub = makeLoadAccountByToken();

    const sut = new AuthMiddleware(loadAccountByTokenStub, role);

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
        const role = 'any_role';
        const { sut, loadAccountByTokenStub } = makeSut(role);

        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');

        await sut.handle(makeFakeRequest());

        expect(loadSpy).toHaveBeenCalledWith('any_token', role);
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

    test('Should return 500 if LoadAccountByToken throws', async () => {
        const { sut, loadAccountByTokenStub } = makeSut();

        jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValue(
            new Promise((resolve, reject) => reject(new Error())),
        );

        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
