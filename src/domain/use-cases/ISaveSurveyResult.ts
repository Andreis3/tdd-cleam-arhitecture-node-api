import { ISurveyResultModel } from '@/domain/models/ISurveyResultModel';

export type ISaveSurveyResultModel = Omit<ISurveyResultModel, 'id'>;

export interface ISaveSurveyResult {
    save(data: ISaveSurveyResultModel): Promise<ISurveyResultModel>;
}
