import { badRequest, noContent, serverError } from '@/presentation/helpers/http/HttpHelpers';
import {
    IController,
    IHttpRequest,
    IHttpResponse,
    IValidation,
    IAddSurvey,
} from '@/presentation/controllers/survey/add-survey/AddSurveyControllerProtocols';

export class AddSurveyController implements IController {
    constructor(private readonly validation: IValidation, private readonly addSurvey: IAddSurvey) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body);

            if (error) {
                return badRequest(error);
            }
            const { question, answers } = httpRequest.body;
            await this.addSurvey.add({
                question,
                answers,
                date: new Date(),
            });
            return noContent();
        } catch (error) {
            return serverError(error);
        }
    }
}
