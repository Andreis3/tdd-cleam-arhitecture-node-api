import { ISurveyModel } from '@/domain/models/survey/ISurveyModel';

export interface ILoadSurveyById {
    loadById(id: string): Promise<ISurveyModel>;
}
