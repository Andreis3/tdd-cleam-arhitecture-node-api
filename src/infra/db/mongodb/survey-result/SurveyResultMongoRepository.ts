import {
    ISaveSurveyResultRepository,
    ISurveyResultModel,
} from '@/data/use-cases/save-survey-result/DbSaveSurveyResultProtocols';
import { ISaveSurveyResultModel } from '@/domain/use-cases/survey-result/ISaveSurveyResult';
import { MongoHelper } from '@/infra/db/mongodb/helpers/MongoHelpers';

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository {
    async save(data: ISaveSurveyResultModel): Promise<ISurveyResultModel> {
        const surveyResultCollection = await MongoHelper.getCollection('surveyResult');
        const surveyResult = await surveyResultCollection.findOneAndUpdate(
            {
                surveyId: data.surveyId,
                accountId: data.accountId,
            },
            {
                $set: {
                    answer: data.answer,
                    data: data.date,
                },
            },
            {
                upsert: true,
                returnOriginal: false,
            },
        );
        return surveyResult.value && MongoHelper.map(surveyResult.value);
    }
}
