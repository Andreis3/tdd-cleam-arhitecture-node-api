import { badRequest, noContent, serverError } from '../../../helpers/http/HttpHelpers';
import { IController, IHttpRequest, IHttpResponse, IValidation, IAddSurvey } from './AddSurveyControllerProtocols';

export class AddSurveyController implements IController {
    constructor(private readonly validation: IValidation, private readonly addSurvey: IAddSurvey) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body);

            if (error) {
                return badRequest(error);
            }
            const { question, answers } = httpRequest.body;
            await this.addSurvey.add({ question, answers });
            return noContent();
        } catch (error) {
            return serverError(error);
        }
    }
}
