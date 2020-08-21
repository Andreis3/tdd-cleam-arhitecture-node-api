import { IHttpRequest, IHttpResponse } from '../protocols/IHttpRequestResponse';
import { MissingParamError } from '../errors/missingParamError';
import { badRequest } from '../helpers/httpHelpers';
import { IController } from '../protocols/IController';
import { IEmailValidator } from '../protocols/IEmailValidator';
import { InvalidParamError } from '../errors/invalidParamError';
export class SignUpController implements IController {
    private readonly emailValidator: IEmailValidator;

    constructor(emailValidator: IEmailValidator) {
        this.emailValidator = emailValidator;
    }

    handle(httpRequest: IHttpRequest): IHttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field));
            }
        }

        const isValid = this.emailValidator.isValid(httpRequest.body.email);

        if (!isValid) {
            return badRequest(new InvalidParamError('email'));
        }
    }
}
