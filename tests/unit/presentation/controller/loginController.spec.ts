import { LoginController } from '../../../../src/presentation/controllers/login/loginController';
import { IEmailValidator, IAuthentication } from '../../../../src/presentation/controllers/login/loginProtocols';
import { InvalidParamError, MissingParamError } from '../../../../src/presentation/errors';
import { badRequest, serverError, unauthorized } from '../../../../src/presentation/helpers/httpHelpers';

const makeEmailValidator = (): IEmailValidator => {
    class EmailValidatorStub implements IEmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }
    return new EmailValidatorStub();
};

const makeAuthentication = (): IAuthentication => {
    class AuthenticationStub implements IAuthentication {
        async auth(email: string, password: string): Promise<string> {
            return new Promise(resolve => resolve('any_token'));
        }
    }
    return new AuthenticationStub();
};

interface ISutTypes {
    sut: LoginController;
    emailValidatorStub: IEmailValidator;
    authenticationStub: IAuthentication;
}

const makeSut = (): ISutTypes => {
    const emailValidatorStub = makeEmailValidator();
    const authenticationStub = makeAuthentication();
    const sut = new LoginController(emailValidatorStub, authenticationStub);
    return {
        sut,
        emailValidatorStub,
        authenticationStub,
    };
};
describe('login Controller', () => {
    test('Should return 400 if no email is provider', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                password: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
    });

    test('Should return 400 if an invalid email is provider', async () => {
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
    });

    test('Should return 400 if no password is provider', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
    });

    test('Should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorStub } = makeSut();
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };
        await sut.handle(httpRequest);

        expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
    });

    test('Should return 500 if EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error();
        });

        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse).toEqual(serverError(new Error()));
    });

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
});
