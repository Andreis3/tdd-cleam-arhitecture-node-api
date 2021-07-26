import { DbLoadSurveys } from '../../../../../src/data/use-cases/load-surveys/DbLoadSurveys';
import { ILoadSurveysRepository } from '../../../../../src/data/protocols/db/survey/ILoadSurveysRepository';
import { ISurveyModel } from '../../../../../src/domain/models/ISurveyModel';

const makeFakeSurveys = (): ISurveyModel[] => {
    return [
        {
            id: 'any_id',
            question: 'any_question',
            answers: [
                {
                    image: 'any_image',
                    answer: 'any_answer',
                },
            ],
            date: new Date(),
        },
        {
            id: 'other_id',
            question: 'other_question',
            answers: [
                {
                    image: 'other_image',
                    answer: 'other_answer',
                },
            ],
            date: new Date(),
        },
    ];
};
interface ISutTypes {
    sut: DbLoadSurveys;
    loadSurveysRepositoryStub: ILoadSurveysRepository;
}

const makeLoadSurveysRepository = (): ILoadSurveysRepository => {
    class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
        async loadAll(): Promise<ISurveyModel[]> {
            return new Promise(resolve => resolve(makeFakeSurveys()));
        }
    }

    return new LoadSurveysRepositoryStub();
};
const makeSut = (): ISutTypes => {
    const loadSurveysRepositoryStub = makeLoadSurveysRepository();
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
    return {
        sut,
        loadSurveysRepositoryStub,
    };
};

describe('DbLoadSurveys', () => {
    test('Should call LoadSurveysRepository', async () => {
        const { sut, loadSurveysRepositoryStub } = makeSut();
        const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
        await sut.load();
        expect(loadAllSpy).toHaveBeenCalled();
    });
});
