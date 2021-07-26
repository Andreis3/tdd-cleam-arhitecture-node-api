import { ISurveyModel } from '../../../domain/models/ISurveyModel';
import { ILoadSurveys } from '../../../domain/use-cases/ILoadSurveys';
import { ILoadSurveysRepository } from '../../protocols/db/survey/ILoadSurveysRepository';

export class DbLoadSurveys implements ILoadSurveys {
    constructor(private readonly loadSurveysRepository: ILoadSurveysRepository) {}
    async load(): Promise<ISurveyModel[]> {
        await this.loadSurveysRepository.loadAll();
        return [];
    }
}
