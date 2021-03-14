import { IAddSurveyModel, IAddSurveyRepository } from '../../../../data/use-cases/add-survey/DbAddSurveyProtocols';
import { MongoHelper } from '../helpers/MongoHelpers';

export class SurveyMongoRepository implements IAddSurveyRepository {
    async add(surveyData: IAddSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('survey');
        await surveyCollection.insertOne(surveyData);
    }
}
