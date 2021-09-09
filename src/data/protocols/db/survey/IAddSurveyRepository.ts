import { IAddSurveyModel } from '@/domain/use-cases/survey/IAddSurvey';

export interface IAddSurveyRepository {
    add(account: IAddSurveyModel): Promise<void>;
}
