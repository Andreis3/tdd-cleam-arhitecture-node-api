import {
    IHttpRequest,
    IHttpResponse,
    IMiddleware,
    ILoadAccountByToken,
} from '@/presentation/middleware/AuthMiddlewareProtocols';
import { forbidden, ok, serverError } from '@/presentation/helpers/http/HttpHelpers';
import { AccessDeniedError } from '@/presentation/errors';

export class AuthMiddleware implements IMiddleware {
    constructor(private readonly loadAccountByToken: ILoadAccountByToken, private readonly role?: string) {}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['x-access-token'];

            if (accessToken) {
                const account = await this.loadAccountByToken.load(accessToken, this.role);

                if (account) {
                    return ok({ accountId: account.id });
                }
            }

            return forbidden(new AccessDeniedError());
        } catch (error) {
            return serverError(error);
        }
    }
}
