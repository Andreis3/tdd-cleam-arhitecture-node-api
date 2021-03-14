import { IAddSurvey, IAddSurveyModel, IAddSurveyRepository } from './DbAddSurveyProtocols';

export class DbAddSurvey implements IAddSurvey {
    constructor(private readonly addSurveyRepository: IAddSurveyRepository) {}
    async add(data: IAddSurveyModel): Promise<void> {
        await this.addSurveyRepository.add(data);
    }
}
