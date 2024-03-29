import { SignUpController } from '@/presentation/controllers/login/signup/SignupController';
import { EmailInUseError, MissingParamError, ServerError } from '@/presentation/errors';
import {
    IAccountModel,
    IAddAccount,
    IAddAccountModel,
    IHttpRequest,
    IValidation,
    IAuthentication,
    IAuthenticationModel,
} from '@/presentation/controllers/login/signup/SignupControllerProtocols';
import { badRequest, forbidden, serverError } from '@/presentation/helpers/http/HttpHelpers';

const makeValidation = (): IValidation => {
    class ValidationStub implements IValidation {
        validate(input: any): Error {
            return null;
        }
    }

    return new ValidationStub();
};

const makeAddAccount = (): IAddAccount => {
    class AddAccountStub implements IAddAccount {
        async add(account: IAddAccountModel): Promise<IAccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email@mail.com',
                password: 'valid_password',
            };

            return await new Promise(resolve => resolve(fakeAccount));
        }
    }

    return new AddAccountStub();
};

const makeAuthentication = (): IAuthentication => {
    class AuthenticationStub implements IAuthentication {
        async auth(authentication: IAuthenticationModel): Promise<string> {
            return new Promise(resolve => resolve('any_token'));
        }
    }
    return new AuthenticationStub();
};

const makeFakeRequest = (): IHttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
    },
});

interface ISutTypes {
    sut: SignUpController;
    addAccountStub: IAddAccount;
    validationStub: IValidation;
    authenticationStub: IAuthentication;
}

const makeSut = (): ISutTypes => {
    const addAccountStub = makeAddAccount();
    const validationStub = makeValidation();
    const authenticationStub = makeAuthentication();
    const sut = new SignUpController(addAccountStub, validationStub, authenticationStub);
    return {
        sut,
        addAccountStub,
        validationStub,
        authenticationStub,
    };
};
describe('SignUp Controller ', () => {
    test('Should call AddAccount with correct values', () => {
        const { sut, addAccountStub } = makeSut();

        const addSpy = jest.spyOn(addAccountStub, 'add');

        sut.handle(makeFakeRequest());

        expect(addSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
        });
    });

    test('Should return 500 if AddAccount throws', async () => {
        const { sut, addAccountStub } = makeSut();

        jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
            return await new Promise((resolve, reject) => reject(new Error()));
        });

        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError('error test'));
    });

    test('Should return 403 if AddAccount returns null', async () => {
        const { sut, addAccountStub } = makeSut();

        jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => resolve(null)));

        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse.statusCode).toBe(403);
        expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
    });

    test('Should return 200 if valid data is provider', async () => {
        const { sut } = makeSut();

        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse.statusCode).toBe(201);
        expect(httpResponse.body).toEqual({
            accessToken: 'any_token',
        });
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

        expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' });
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
