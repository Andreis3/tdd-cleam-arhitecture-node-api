import MockDate from 'mockdate';

import { DbAddSurvey } from '@/data/use-cases/add-survey/DbAddSurvey';
import { IAddSurveyModel, IAddSurveyRepository } from '@/data/protocols/db/survey/DbAddSurveyProtocols';

const makeFakeAddSurveyData = (): IAddSurveyModel => ({
    question: 'any_question',
    answers: [
        {
            image: 'any_image',
            answer: 'any answer',
        },
    ],
    date: new Date(),
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
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
        const surveyData = makeFakeAddSurveyData();
        await sut.add(surveyData);

        expect(addSpy).toHaveBeenCalledWith(surveyData);
    });

    test('should throw if IAddSurveyRepository throws', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut();
        jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(
            new Promise((resolve, reject) => reject(new Error())),
        );
        const promise = sut.add(makeFakeAddSurveyData());
        await expect(promise).rejects.toThrow();
    });
});
