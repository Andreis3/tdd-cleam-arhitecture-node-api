import { ILoadAccountByToken } from '../../domain/use-cases/ILoadAccountByToken';
import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers/http/HttpHelpers';
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols';

export class AuthMiddleware implements IMiddleware {
    constructor(private readonly loadAccountByToken: ILoadAccountByToken) {}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['x-access-token'];

            if (accessToken) {
                const account = await this.loadAccountByToken.load(accessToken);

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
