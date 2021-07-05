import { forbidden } from '../../../../src/presentation/helpers/http/HttpHelpers';
import { AccessDeniedError } from '../../../../src/presentation/errors';
import { AuthMiddleware } from '../../../../src/presentation/middleware/AuthMiddleware';
import { ILoadAccountByToken } from '../../../../src/domain/use-cases/ILoadAccountByToken';
import { IAccountModel } from '../../../../src/domain/models/IAccountModel';

const makeFakeAccount = (): IAccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
});

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        class LoadAccountByTokenStub implements ILoadAccountByToken {
            async load(accessToken: string, role?: string): Promise<IAccountModel> {
                return new Promise(resolve => resolve(makeFakeAccount()));
            }
        }
        const loadAccountByTokenStub = new LoadAccountByTokenStub();

        const sut = new AuthMiddleware(loadAccountByTokenStub);

        const httpResponse = await sut.handle({});

        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });

    test('Should loadAccountByToken with correct accessToken', async () => {
        class LoadAccountByTokenStub implements ILoadAccountByToken {
            async load(accessToken: string, role?: string): Promise<IAccountModel> {
                return new Promise(resolve => resolve(makeFakeAccount()));
            }
        }
        const loadAccountByTokenStub = new LoadAccountByTokenStub();

        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');

        const sut = new AuthMiddleware(loadAccountByTokenStub);

        await sut.handle({
            headers: {
                'x-access-token': 'any_token',
            },
        });

        expect(loadSpy).toHaveBeenCalledWith('any_token');
    });
});
