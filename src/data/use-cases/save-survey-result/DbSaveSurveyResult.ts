import {
    ISaveSurveyResultRepository,
    ISurveyResultModel,
    ISaveSurveyResult,
    ISaveSurveyResultModel,
} from '@/data/use-cases/save-survey-result/DbSaveSurveyResultProtocols';

export class DbSaveSurveyResult implements ISaveSurveyResult {
    constructor(private readonly saveSurveyResultRepository: ISaveSurveyResultRepository) {}
    async save(data: ISaveSurveyResultModel): Promise<ISurveyResultModel> {
        const surveySaveResult = await this.saveSurveyResultRepository.save(data);
        return surveySaveResult;
    }
}
