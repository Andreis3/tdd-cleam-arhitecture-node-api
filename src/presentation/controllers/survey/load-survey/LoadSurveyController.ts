import { ILoadSurveys } from '@/domain/use-cases/ILoadSurveys';
import { noContent, ok, serverError } from '@/presentation/helpers/http/HttpHelpers';
import {
    IController,
    IHttpRequest,
    IHttpResponse,
} from '@/presentation/controllers/survey/load-survey/LoadSurveyControllerProtocols';

export class LoadSurveysController implements IController {
    constructor(private readonly loadSurveys: ILoadSurveys) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const surveys = await this.loadSurveys.load();
            return surveys.length ? ok(surveys) : noContent();
        } catch (error) {
            return serverError(error);
        }
    }
}
