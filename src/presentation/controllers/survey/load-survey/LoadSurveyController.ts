import { ILoadSurveys } from '../../../../domain/use-cases/ILoadSurveys';
import { ok, serverError } from '../../../helpers/http/HttpHelpers';
import { IController, IHttpRequest, IHttpResponse } from '../load-survey/LoadSurveyControllerProtocols';

export class LoadSurveysController implements IController {
    constructor(private readonly loadSurveys: ILoadSurveys) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const surveys = await this.loadSurveys.load();
            return ok(surveys);
        } catch (error) {
            return serverError(error);
        }
    }
}
