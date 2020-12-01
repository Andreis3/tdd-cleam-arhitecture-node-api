import { LoginController } from '../../../../src/presentation/controllers/login/loginController';
import { IEmailValidator } from '../../../../src/presentation/controllers/signup/signupProtocols';
import { InvalidParamError, MissingParamError } from '../../../../src/presentation/errors';
import { badRequest } from '../../../../src/presentation/helpers/httpHelpers';

const makeEmailValidator = (): IEmailValidator => {
    class EmailValidatorStub implements IEmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }
    return new EmailValidatorStub();
};
interface ISutTypes {
    sut: LoginController;
    emailValidatorStub: IEmailValidator;
}

const makeSut = (): ISutTypes => {
    const emailValidatorStub = makeEmailValidator();
    const sut = new LoginController(emailValidatorStub);
    return {
        sut,
        emailValidatorStub,
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
});