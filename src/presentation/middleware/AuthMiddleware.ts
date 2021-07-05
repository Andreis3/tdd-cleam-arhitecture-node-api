import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/HttpHelpers';
import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols';

export class AuthMiddleware implements IMiddleware {
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        return forbidden(new AccessDeniedError());
    }
}
