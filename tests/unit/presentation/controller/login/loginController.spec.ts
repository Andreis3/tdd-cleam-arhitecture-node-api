import { LoginController } from '../../../../../src/presentation/controllers/login/loginController';
import {
    IAuthentication,
    IHttpRequest,
    IValidation,
} from '../../../../../src/presentation/controllers/login/loginProtocols';
import { MissingParamError } from '../../../../../src/presentation/errors';
import { badRequest, serverError, unauthorized, ok } from '../../../../../src/presentation/helpers/http/httpHelpers';

const makeAuthentication = (): IAuthentication => {
    class AuthenticationStub implements IAuthentication {
        async auth(email: string, password: string): Promise<string> {
            return new Promise(resolve => resolve('any_token'));
        }
    }
    return new AuthenticationStub();
};

const makeValidation = (): IValidation => {
    class ValidationStub implements IValidation {
        validate(input: any): Error {
            return null;
        }
    }

    return new ValidationStub();
};

interface ISutTypes {
    sut: LoginController;
    authenticationStub: IAuthentication;
    validationStub: IValidation;
}

const makeSut = (): ISutTypes => {
    const authenticationStub = makeAuthentication();
    const validationStub = makeValidation();
    const sut = new LoginController(validationStub, authenticationStub);
    return {
        sut,
        authenticationStub,
        validationStub,
    };
};

const makeFakeRequest = (): IHttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
    },
});
describe('login Controller', () => {
    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationStub } = makeSut();
        const authSpy = jest.spyOn(authenticationStub, 'auth');

        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };
        await sut.handle(httpRequest);

        expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password');
    });

    test('Should return 401 if invalid credentials are provider', async () => {
        const { sut, authenticationStub } = makeSut();
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)));

        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse).toEqual(unauthorized());
    });

    test('Should return 500 if Authenticate throws', async () => {
        const { sut, authenticationStub } = makeSut();
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())),
        );

        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 200 if valid credentials are provider', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }));
    });

    test('Should call Validation  with correct value', () => {
        const { sut, validationStub } = makeSut();

        const addSpy = jest.spyOn(validationStub, 'validate');

        const httpRequest = makeFakeRequest();

        sut.handle(httpRequest);

        expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    test('Should return 400 if Validation return an error', async () => {
        const { sut, validationStub } = makeSut();

        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));

        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
    });
});
