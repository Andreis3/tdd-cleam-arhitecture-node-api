import { AddSurveyController } from '../../../../../../src/presentation/controllers/survey/add-survey/AddSurveyController';
import {
    IHttpRequest,
    IValidation,
} from '../../../../../../src/presentation/controllers/survey/add-survey/AddSurveyControllerProtocols';
import { badRequest } from '../../../../../../src/presentation/helpers/http/HttpHelpers';

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

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationStub } = makeSut();

        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
        const httpResponse = await sut.handle(makeFakeRequest());

        expect(httpResponse).toEqual(badRequest(new Error()));
    });
});
