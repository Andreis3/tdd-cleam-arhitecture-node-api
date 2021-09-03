import { ISurveyModel } from '@/domain/models/ISurveyModel';

export interface ILoadSurveyByIdRepository {
    loadById(id: string): Promise<ISurveyModel>;
}
