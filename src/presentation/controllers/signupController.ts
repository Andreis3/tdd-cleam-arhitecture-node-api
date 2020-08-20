import { IHttpRequest, IHttpResponse } from '../protocols/IHttpRequestResponse';
import { MissingParamError } from '../errors/missingParamError';
import { badRequest } from '../helpers/httpHelpers';
export class SignUpController {
    handle(httpRequest: IHttpRequest): IHttpResponse {
        const requiredFields = ['name', 'email'];

        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field));
            }
        }
    }
}
