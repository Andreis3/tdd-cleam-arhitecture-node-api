import { ISurveyResultModel } from '@/domain/models/survey-result/ISurveyResultModel';
import { ISaveSurveyResultModel } from '@/domain/use-cases/survey-result/ISaveSurveyResult';

export interface ISaveSurveyResultRepository {
    save(data: ISaveSurveyResultModel): Promise<ISurveyResultModel>;
}
