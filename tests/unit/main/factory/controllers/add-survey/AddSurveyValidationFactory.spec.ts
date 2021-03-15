import { RequiredFieldValidation, ValidationComposite } from '../../../../../../src/validation/validators';
import { makeAddSurveyValidation } from '../../../../../../src/main/factory/controllers/add-survey/AddSurveyValidationFactory';
import { IValidation } from '../../../../../../src/presentation/protocols/IValidation';

jest.mock('../../../../../../src/validation/validators/ValidationComposite');

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
