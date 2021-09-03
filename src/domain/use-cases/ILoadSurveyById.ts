import { ISurveyModel } from '@/domain/models/ISurveyModel';

export interface ILoadSurveyById {
    loadById(id: string): Promise<ISurveyModel>;
}
