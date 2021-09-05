import { ISurveyResultModel } from '@/domain/models/ISurveyResultModel';
import { ISaveSurveyResultModel } from '@/domain/use-cases/ISaveSurveyResult';

export interface ISaveSurveyResultRepository {
    save(data: ISaveSurveyResultModel): Promise<ISurveyResultModel>;
}
