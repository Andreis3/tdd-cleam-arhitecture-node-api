import { ISurveyModel } from '@/domain/models/ISurveyModel';

export interface ILoadSurveys {
    load(): Promise<ISurveyModel[]>;
}
