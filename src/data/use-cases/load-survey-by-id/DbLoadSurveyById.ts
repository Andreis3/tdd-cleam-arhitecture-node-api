import {
    ILoadSurveyByIdRepository,
    ISurveyModel,
    ILoadSurveyById,
} from '@/data/use-cases/load-survey-by-id/DbLoadSurveyByIdProtocols';

export class DbLoadSurveyById implements ILoadSurveyById {
    constructor(private readonly loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository) {}
    async loadById(id: string): Promise<ISurveyModel> {
        const survey = await this.loadSurveyByIdRepositoryStub.loadById(id);
        return survey;
    }
}
