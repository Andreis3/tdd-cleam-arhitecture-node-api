import {
    IController,
    IHttpRequest,
    IHttpResponse,
    IAuthentication,
    IValidation,
} from '@/presentation/controllers/login/login/LoginControllerProtocols';
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/HttpHelpers';

export class LoginController implements IController {
    constructor(private readonly validation: IValidation, private readonly authentication: IAuthentication) {
        this.validation = validation;
        this.authentication = authentication;
    }

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body);
            if (error) {
                return badRequest(error);
            }
            const { email, password } = httpRequest.body;

            const accessToken = await this.authentication.auth({ email, password });
            if (!accessToken) {
                return unauthorized();
            }

            return ok({ accessToken });
        } catch (error) {
            return serverError(error);
        }
    }
}
