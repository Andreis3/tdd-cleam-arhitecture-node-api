import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/httpHelpers';
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../../protocols/';

export class LoginController implements IController {
    private readonly emailValidator: IEmailValidator;

    constructor(emailValidator: IEmailValidator) {
        this.emailValidator = emailValidator;
    }

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        if (!httpRequest.body.email) {
            return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))));
        }

        if (!httpRequest.body.password) {
            return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))));
        }

        this.emailValidator.isValid(httpRequest.body.email);
    }
}
