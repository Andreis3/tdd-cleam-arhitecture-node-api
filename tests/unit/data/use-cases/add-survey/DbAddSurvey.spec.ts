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
interface ISutTypes {
    sut: DbAddSurvey;
    addSurveyRepositoryStub: IAddSurveyRepository;
}

const makeAddSurveyRepository = (): IAddSurveyRepository => {
    class AddSurveyRepositoryStub implements IAddSurveyRepository {
        async add(account: IAddSurveyModel): Promise<void> {
            return new Promise(resolve => resolve());
        }
    }
    return new AddSurveyRepositoryStub();
};

const makeSut = (): ISutTypes => {
    const addSurveyRepositoryStub = makeAddSurveyRepository();
    const sut = new DbAddSurvey(addSurveyRepositoryStub);
    return {
        sut,
        addSurveyRepositoryStub,
    };
};

describe('DbAddSurvey Usecase', () => {
    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
        const surveyData = makeFakeAddSurveyData();
        await sut.add(surveyData);

        expect(addSpy).toHaveBeenCalledWith(surveyData);
    });
});
