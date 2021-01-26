import { IAuthentication } from '../../../domain/use-cases/IAuthentication';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers/httpHelpers';
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../../protocols/';

export class LoginController implements IController {
    private readonly emailValidator: IEmailValidator;
    private readonly authentication: IAuthentication;

    constructor(emailValidator: IEmailValidator, authentication: IAuthentication) {
        this.emailValidator = emailValidator;
        this.authentication = authentication;
    }

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { email, password } = httpRequest.body;

            const requiredFields = ['email', 'password'];

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field));
                }
            }

            const isValid = this.emailValidator.isValid(email);

            if (!isValid) {
                return badRequest(new InvalidParamError('email'));
            }

            await this.authentication.auth(email, password);
        } catch (error) {
            return serverError(error);
        }
    }
}
