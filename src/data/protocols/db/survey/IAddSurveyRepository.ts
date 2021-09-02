import { IAddSurveyModel } from '@/domain/use-cases/IAddSurvey';

export interface IAddSurveyRepository {
    add(account: IAddSurveyModel): Promise<void>;
}
