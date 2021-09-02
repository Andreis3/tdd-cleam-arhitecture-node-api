import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { makeAddSurveyValidation } from '@/main/factory/controllers/survey/add-survey/AddSurveyValidationFactory';
import { IValidation } from '@/presentation/protocols/IValidation';

jest.mock('@/validation/validators/ValidationComposite');

describe('AddSurveyValidationFactory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeAddSurveyValidation();
        const validations: IValidation[] = [];
        for (const field of ['question', 'answers']) {
            validations.push(new RequiredFieldValidation(field));
        }

        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
