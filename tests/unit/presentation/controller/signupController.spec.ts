import { SignUpController } from '../../../../src/presentation/controllers/signupController';
import { MissingParamError, InvalidParamError, ServerError } from '../../../../src/presentation/errors';
import {
    IEmailValidator,
    IAccountModel,
    IAddAccount,
    IAddAccountModel,
} from '../../../../src/presentation/controllers/signup/signupProtocols';

const makeEmailValidator = (): IEmailValidator => {
    class EmailValidatorStub implements IEmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }

    return new EmailValidatorStub();
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

            return await new Promise((resolve) => resolve(fakeAccount));
        }
    }

    return new AddAccountStub();
};

interface ISutTypes {
    sut: SignUpController;
    emailValidatorStub: IEmailValidator;
    addAccountStub: IAddAccount;
}

const makeSut = (): ISutTypes => {
    const emailValidatorStub = makeEmailValidator();
    const addAccountStub = makeAddAccount();
    const sut = new SignUpController(emailValidatorStub, addAccountStub);
    return {
        sut,
        emailValidatorStub,
        addAccountStub,
    };
};
describe('SignUp Controller ', () => {
    test('Should return 400 if no name is provider', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('name'));
    });

    test('Should return 400 if no email is provider', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });

    test('Should return 400 if no password is provider', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                passwordConfirmation: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password'));
    });

    test('Should return 400 if no password confirmation is provider', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
    });

    test('Should return 400 if  password confirmation fails', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'invalid_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'));
    });

    test('Should return 400 if an invalid email is provider', async () => {
        const { sut, emailValidatorStub } = makeSut();

        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('email'));
    });

    test('Should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorStub } = makeSut();

        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'valid_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        sut.handle(httpRequest);

        expect(isValidSpy).toHaveBeenCalledWith('valid_email@mail.com');
    });

    test('Should return 500 if EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = makeSut();

        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error();
        });

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    test('Should call AddAccount with correct values', () => {
        const { sut, addAccountStub } = makeSut();

        const addSpy = jest.spyOn(addAccountStub, 'add');

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        sut.handle(httpRequest);

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

        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    test('Should return 200 if valid data is provider', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                name: 'valid_name',
                email: 'valid_email@mail.com',
                password: 'valid_password',
                passwordConfirmation: 'valid_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(201);
        expect(httpResponse.body).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'valid_password',
        });
    });
});