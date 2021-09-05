import {
    ISurveyModel,
    ILoadSurveys,
    ILoadSurveysRepository,
} from '@/data/use-cases/load-surveys/DbLoadSurveysProtocols';

export class DbLoadSurveys implements ILoadSurveys {
    constructor(private readonly loadSurveysRepository: ILoadSurveysRepository) {}
    async load(): Promise<ISurveyModel[]> {
        const surveys = await this.loadSurveysRepository.loadAll();
        return surveys;
    }
}
