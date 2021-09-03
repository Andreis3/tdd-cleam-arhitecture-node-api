import { ISurveyResultModel } from '@/domain/models/ISurveyResultModel';

export type SaveSurveyResultModel = Omit<ISurveyResultModel, 'id'>;

export interface ISaveSurveyResult {
    save(data: SaveSurveyResultModel): Promise<ISurveyResultModel>;
}
