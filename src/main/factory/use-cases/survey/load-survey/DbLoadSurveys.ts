import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/SurveyMongoRepository';
import { ILoadSurveys } from '@/domain/use-cases/ILoadSurveys';
import { DbLoadSurveys } from '@/data/use-cases/load-surveys/DbLoadSurveys';

export const makeDbLoadSurvey = (): ILoadSurveys => {
    const surveyMongoRepository = new SurveyMongoRepository();
    return new DbLoadSurveys(surveyMongoRepository);
};
