import { SignUpController } from '../../../src/presentation/controllers/signupController';
import { MissingParamError } from '../../../src/presentation/errors/missingParamError';
describe('SignUp Controller ', () => {
    test('Should return 400 if no name is provider', () => {
        const sut = new SignUpController();
        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('name'));
    });

    test('Should return 400 if no email is provider', () => {
        const sut = new SignUpController();
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        const httpResponse = sut.handle(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });
});