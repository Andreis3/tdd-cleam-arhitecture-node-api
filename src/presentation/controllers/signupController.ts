import { IHttpRequest, IHttpResponse } from '../protocols/IHttpRequestResponse';
import { MissingParamError } from '../errors/missingParamError';
import { badRequest } from '../helpers/httpHelpers';
import { IController } from '../protocols/IController';
export class SignUpController implements IController {
    handle(httpRequest: IHttpRequest): IHttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field));
            }
        }
    }
}
