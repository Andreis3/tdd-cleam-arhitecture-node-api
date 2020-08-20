import { IHttpRequest, IHttpResponse } from '../protocols/IHttpRequestResponse';
import { MissingParamError } from '../errors/missingParamError';
import { badRequest } from '../helpers/httpHelpers';
export class SignUpController {
    handle(httpRequest: IHttpRequest): IHttpResponse {
        const { name, email } = httpRequest.body;

        if (!name) {
            return badRequest(new MissingParamError('name'));
        }

        if (!email) {
            return badRequest(new MissingParamError('email'));
        }
    }
}
