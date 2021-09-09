import {
    IAddSurvey,
    IAddSurveyModel,
    IAddSurveyRepository,
} from '@/data/use-cases/survey/add-survey/DbAddSurveyProtocols';

export class DbAddSurvey implements IAddSurvey {
    constructor(private readonly addSurveyRepository: IAddSurveyRepository) {}
    async add(data: IAddSurveyModel): Promise<void> {
        await this.addSurveyRepository.add(data);
    }
}
