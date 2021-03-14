import { AddSurveyController } from '../../../../../../src/presentation/controllers/survey/add-survey/AddSurveyController';
import {
    IHttpRequest,
    IValidation,
    IAddSurvey,
    IAddSurveyModel,
} from '../../../../../../src/presentation/controllers/survey/add-survey/AddSurveyControllerProtocols';
import { badRequest, noContent, serverError } from '../../../../../../src/presentation/helpers/http/HttpHelpers';

interface ISutTypes {
    sut: AddSurveyController;
    validationStub: IValidation;
    addSurveyStub: IAddSurvey;
}

const makeFakeRequest = (): IHttpRequest => ({
    body: {
        question: 'any_question',
        answers: [
            {
                image: 'any_image',
                answer: 'any answer',
            },
        ],
    },
});

const makeSut = (): ISutTypes => {
    const validationStub = makeValidation();
    const addSurveyStub = makeAddSurvey();
    const sut = new AddSurveyController(validationStub, addSurveyStub);

    return {
        sut,
        validationStub,
        addSurveyStub,
    };
};

const makeValidation = (): IValidation => {
    class ValidationStub implements IValidation {
        validate(input: any): Error {
            return null;
        }
    }
    return new ValidationStub();
};

const makeAddSurvey = (): IAddSurvey => {
    class AddSurveyStub implements IAddSurvey {
        async add(data: IAddSurveyModel): Promise<void> {
            return new Promise(resolve => resolve());
        }
    }
    return new AddSurveyStub();
};

describe('AddSurvey Controller', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut();

        const httpRequest = makeFakeRequest();
        const validateSpy = jest.spyOn(validationStub, 'validate');
        await sut.handle(httpRequest);

        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationStub } = makeSut();

        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse).toEqual(badRequest(new Error()));
    });

    test('Should call AddSurvey with correct values', async () => {
        const { sut, addSurveyStub } = makeSut();

        const httpRequest = makeFakeRequest();
        const addSpy = jest.spyOn(addSurveyStub, 'add');
        await sut.handle(httpRequest);

        expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    test('Should return 500 if AddSurvey throws', async () => {
        const { sut, addSurveyStub } = makeSut();

        jest.spyOn(addSurveyStub, 'add').mockReturnValue(new Promise((resolve, reject) => reject(new Error())));
        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 204 if on success', async () => {
        const { sut } = makeSut();

        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse).toEqual(noContent());
    });
});
