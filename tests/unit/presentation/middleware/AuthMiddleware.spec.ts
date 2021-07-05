import { forbidden } from '../../../../src/presentation/helpers/http/HttpHelpers';
import { AccessDeniedError } from '../../../../src/presentation/errors';
import { AuthMiddleware } from '../../../../src/presentation/middleware/AuthMiddleware';

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        const sut = new AuthMiddleware();

        const httpResponse = await sut.handle({});

        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });
});
