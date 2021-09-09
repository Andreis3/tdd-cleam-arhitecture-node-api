import { ISurveyModel } from '@/domain/models/survey/ISurveyModel';

export interface ILoadSurveys {
    load(): Promise<ISurveyModel[]>;
}
