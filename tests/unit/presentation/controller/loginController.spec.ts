import { LoginController } from '../../../../src/presentation/controllers/login/loginController';
import { MissingParamError } from '../../../../src/presentation/errors';
import { badRequest } from '../../../../src/presentation/helpers/httpHelpers';
describe('login Controller', () => {
    test('Should return 400 if no email is provider', async () => {
        const sut = new LoginController();
        const httpRequest = {
            body: {
                password: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
    });
});
