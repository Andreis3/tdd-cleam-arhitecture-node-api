import MockDate from 'mockdate';

import { LoadSurveysController } from '.././../../../../../src/presentation/controllers/survey/load-survey/LoadSurveyController';
import {
    ILoadSurveys,
    ISurveyModel,
} from '.././../../../../../src/presentation/controllers/survey/load-survey/LoadSurveyControllerProtocols';

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
    sut: LoadSurveysController;
    loadSurveysStub: ILoadSurveys;
}

const makeLoadSurveys = (): ILoadSurveys => {
    class LoadSurveysStub implements ILoadSurveys {
        async load(): Promise<ISurveyModel[]> {
            return new Promise(resolve => resolve(makeFakeSurveys()));
        }
    }

    return new LoadSurveysStub();
};

const makeSut = (): ISutTypes => {
    const loadSurveysStub = makeLoadSurveys();
    const sut = new LoadSurveysController(loadSurveysStub);

    return {
        sut,
        loadSurveysStub,
    };
};

describe('LoadSurveys Controller', () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });
    test('loadSurveysController', async () => {
        const { loadSurveysStub, sut } = makeSut();
        const loadSpy = jest.spyOn(loadSurveysStub, 'load');

        await sut.handle({});

        expect(loadSpy).toHaveBeenCalled();
    });
});
