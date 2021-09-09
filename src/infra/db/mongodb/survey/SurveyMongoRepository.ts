import { ILoadSurveyByIdRepository } from '@/data/use-cases/survey/load-survey-by-id/DbLoadSurveyByIdProtocols';
import { ILoadSurveysRepository } from '../../../../data/protocols/db/survey/ILoadSurveysRepository';
import {
    IAddSurveyModel,
    IAddSurveyRepository,
} from '../../../../data/use-cases/survey/add-survey/DbAddSurveyProtocols';
import { ISurveyModel } from '../../../../domain/models/survey/ISurveyModel';
import { MongoHelper } from '../helpers/MongoHelpers';

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository, ILoadSurveyByIdRepository {
    async add(surveyData: IAddSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('survey');
        await surveyCollection.insertOne(surveyData);
    }

    async loadAll(): Promise<ISurveyModel[]> {
        const surveyCollection = await MongoHelper.getCollection('survey');
        const surveys = await surveyCollection.find().toArray();
        return surveys && MongoHelper.mapArray(surveys);
    }

    async loadById(id: string): Promise<ISurveyModel> {
        const surveyCollection = await MongoHelper.getCollection('survey');
        const survey = await surveyCollection.findOne({ _id: id });
        return survey && MongoHelper.map(survey);
    }
}
