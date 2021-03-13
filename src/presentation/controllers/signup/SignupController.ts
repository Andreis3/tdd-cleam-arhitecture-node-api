import {
    IHttpRequest,
    IHttpResponse,
    IController,
    IAddAccount,
    IValidation,
    IAuthentication,
} from './SignupControllerProtocols';
import { badRequest, serverError, create } from '../../helpers/http/HttpHelpers';
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

            await this.addAccount.add({
                name,
                email,
                password,
            });

            const accessToken = await this.authentication.auth({ email, password });

            return create({ accessToken });
        } catch (error) {
            return serverError(error);
        }
    }
}
