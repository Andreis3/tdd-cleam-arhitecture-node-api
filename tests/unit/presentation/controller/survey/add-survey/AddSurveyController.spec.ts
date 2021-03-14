import { AddSurveyController } from '../../../../../../src/presentation/controllers/survey/add-survey/AddSurveyController';
import {
    IHttpRequest,
    IValidation,
} from '../../../../../../src/presentation/controllers/survey/add-survey/AddSurveyControllerProtocols';

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

describe('AddSurvey Controller', () => {
    test('Should call Validation with correct values', async () => {
        class ValidationStub implements IValidation {
            validate(input: any): Error {
                return null;
            }
        }

        const validationStub = new ValidationStub();
        const validateSpy = jest.spyOn(validationStub, 'validate');

        const sut = new AddSurveyController(validationStub);
        const httpRequest = makeFakeRequest();
        await sut.handle(httpRequest);

        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});
