import { ISurveyModel } from '@/domain/models/survey/ISurveyModel';

export interface ILoadSurveysRepository {
    loadAll(): Promise<ISurveyModel[]>;
}
