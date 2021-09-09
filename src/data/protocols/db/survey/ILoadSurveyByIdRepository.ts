import { ISurveyModel } from '@/domain/models/survey/ISurveyModel';

export interface ILoadSurveyByIdRepository {
    loadById(id: string): Promise<ISurveyModel>;
}
