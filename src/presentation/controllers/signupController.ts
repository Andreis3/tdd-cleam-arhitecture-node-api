import { IHttpRequest, IHttpResponse } from '../protocols/IHttpRequestResponse';
import { MissingParamError } from '../errors/missingParamError';
export class SignUpController {
    handle(httpRequest: IHttpRequest): IHttpResponse {
        const { name, email } = httpRequest.body;

        if (!name) {
            return {
                statusCode: 400,
                body: new MissingParamError('name'),
            };
        }

        if (!email) {
            return {
                statusCode: 400,
                body: new MissingParamError('email'),
            };
        }
    }
}
