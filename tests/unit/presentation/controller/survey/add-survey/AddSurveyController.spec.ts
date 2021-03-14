import { AddSurveyController } from '../../../../../../src/presentation/controllers/survey/add-survey/AddSurveyController';
import {
    IHttpRequest,
    IValidation,
} from '../../../../../../src/presentation/controllers/survey/add-survey/AddSurveyControllerProtocols';

interface ISutTypes {
    sut: AddSurveyController;
    validationStub: IValidation;
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

const makeValidation = (): IValidation => {
    class ValidationStub implements IValidation {
        validate(input: any): Error {
            return null;
        }
    }
    return new ValidationStub();
};

const makeSut = (): ISutTypes => {
    const validationStub = makeValidation();
    const sut = new AddSurveyController(validationStub);

    return {
        sut,
        validationStub,
    };
};

describe('AddSurvey Controller', () => {
    test('Should call Validation with correct values', async () => {
        const { sut, validationStub } = makeSut();

        const httpRequest = makeFakeRequest();
        const validateSpy = jest.spyOn(validationStub, 'validate');
        await sut.handle(httpRequest);

        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});
