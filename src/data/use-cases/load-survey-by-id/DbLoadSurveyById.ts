import {
    ILoadSurveyByIdRepository,
    ISurveyModel,
    ILoadSurveyById,
} from '@/data/use-cases/load-survey-by-id/DbLoadSurveyByIdProtocols';

export class DbLoadSurveyById implements ILoadSurveyById {
    constructor(private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}
    async loadById(id: string): Promise<ISurveyModel> {
        const survey = await this.loadSurveyByIdRepository.loadById(id);
        return survey;
    }
}
