import { LoginController } from '../../../../src/presentation/controllers/login/loginController';
import { MissingParamError } from '../../../../src/presentation/errors';
import { badRequest } from '../../../../src/presentation/helpers/httpHelpers';

interface ISutTypes {
    sut: LoginController;
}

const makeSut = (): ISutTypes => {
    const sut = new LoginController();
    return { sut };
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
});
