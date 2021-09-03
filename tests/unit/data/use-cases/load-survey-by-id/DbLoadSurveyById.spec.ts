import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/ILoadSurveyByIdRepository';
import { DbLoadSurveyById } from '@/data/use-cases/load-survey-by-id/DbLoadSurveyById';
import { ISurveyModel } from '@/domain/models/ISurveyModel';
import MockDate from 'mockdate';

interface ISutTypes {
    sut: DbLoadSurveyById;
    loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository;
}

const makeFakeSurvey = (): ISurveyModel => {
    return {
        id: 'any_id',
        question: 'any_question',
        answers: [
            {
                image: 'any_image',
                answer: 'any_answer',
            },
        ],
        date: new Date(),
    };
};

const makeLoadSurveyByIdRepository = (): ILoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
        async loadById(id: string): Promise<ISurveyModel> {
            return new Promise(resolve => resolve(makeFakeSurvey()));
        }
    }

    return new LoadSurveyByIdRepositoryStub();
};

const makeSut = (): ISutTypes => {
    const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository();
    const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
    return {
        sut,
        loadSurveyByIdRepositoryStub,
    };
};

describe('DbLoadById', () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test('Should call LoadSurveyByIdRepository', async () => {
        const { sut, loadSurveyByIdRepositoryStub } = makeSut();
        const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
        await sut.loadById('any_id');

        expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
    });
});
