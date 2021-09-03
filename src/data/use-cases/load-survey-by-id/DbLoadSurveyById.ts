import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/ILoadSurveyByIdRepository';
import { ISurveyModel } from '@/domain/models/ISurveyModel';
import { ILoadSurveyById } from '@/domain/use-cases/ILoadSurveyById';

export class DbLoadSurveyById implements ILoadSurveyById {
    constructor(private readonly loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository) {}
    async loadById(id: string): Promise<ISurveyModel> {
        const survey = await this.loadSurveyByIdRepositoryStub.loadById(id);
        return survey;
    }
}
