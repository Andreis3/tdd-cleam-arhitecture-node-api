import { ILoadSurveysRepository } from '../../../../data/protocols/db/survey/ILoadSurveysRepository';
import { IAddSurveyModel, IAddSurveyRepository } from '../../../../data/use-cases/add-survey/DbAddSurveyProtocols';
import { ISurveyModel } from '../../../../domain/models/ISurveyModel';
import { MongoHelper } from '../helpers/MongoHelpers';

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository {
    async add(surveyData: IAddSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('survey');
        await surveyCollection.insertOne(surveyData);
    }

    async loadAll(): Promise<ISurveyModel[]> {
        const surveyCollection = await MongoHelper.getCollection('survey');
        const surveys: ISurveyModel[] = await surveyCollection.find().toArray();
        return surveys;
    }
}
