import { DbAddSurvey } from '../../../../../src/data/use-cases/add-survey/DbAddSurvey';
import {
    IAddSurveyModel,
    IAddSurveyRepository,
} from '../../../../../src/data/protocols/db/survey/DbAddSurveyProtocols';

const makeFakeAddSurveyData = (): IAddSurveyModel => ({
    question: 'any_question',
    answers: [
        {
            image: 'any_image',
            answer: 'any answer',
        },
    ],
});

describe('DbAddSurvey Usecase', () => {
    test('Should call AddSurveyRepository with correct values', async () => {
        class AddSurveyRepositoryStub implements IAddSurveyRepository {
            async add(account: IAddSurveyModel): Promise<void> {
                return new Promise(resolve => resolve());
            }
        }
        const addSurveyRepositoryStub = new AddSurveyRepositoryStub();
        const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
        const sut = new DbAddSurvey(addSurveyRepositoryStub);
        const surveyData = makeFakeAddSurveyData();
        await sut.add(surveyData);

        expect(addSpy).toHaveBeenCalledWith(surveyData);
    });
});
