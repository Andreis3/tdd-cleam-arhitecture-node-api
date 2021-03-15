import { DbAddSurvey } from '../../../../data/use-cases/add-survey/DbAddSurvey';
import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey/SurveyMongoRepository';
import { IAddSurvey } from '../../../../domain/use-cases/IAddSurvey';

export const makeDbAddSurvey = (): IAddSurvey => {
    const surveyMongoRepository = new SurveyMongoRepository();
    return new DbAddSurvey(surveyMongoRepository);
};
