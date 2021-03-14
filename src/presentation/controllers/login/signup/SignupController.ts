import {
    IHttpRequest,
    IHttpResponse,
    IController,
    IAddAccount,
    IValidation,
    IAuthentication,
} from './SignupControllerProtocols';
import { badRequest, serverError, create, forbidden } from '../../../helpers/http/HttpHelpers';
import { EmailInUseError } from '../../../errors';
export class SignUpController implements IController {
    constructor(
        private readonly addAccount: IAddAccount,
        private readonly validation: IValidation,
        private readonly authentication: IAuthentication,
    ) {
        this.addAccount = addAccount;
        this.validation = validation;
        this.authentication = authentication;
    }

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body);
            if (error) {
                return badRequest(error);
            }

            const { name, email, password } = httpRequest.body;

            const account = await this.addAccount.add({
                name,
                email,
                password,
            });
            if (!account) {
                return forbidden(new EmailInUseError());
            }
            const accessToken = await this.authentication.auth({ email, password });

            return create({ accessToken });
        } catch (error) {
            return serverError(error);
        }
    }
}
