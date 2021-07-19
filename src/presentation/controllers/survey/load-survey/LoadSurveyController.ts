import { ILoadSurveys } from '../../../../domain/use-cases/ILoadSurveys';
import { IController, IHttpRequest, IHttpResponse } from '../load-survey/LoadSurveyControllerProtocols';

export class LoadSurveysController implements IController {
    constructor(private readonly loadSurveys: ILoadSurveys) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        await this.loadSurveys.load();
        return null;
    }
}
