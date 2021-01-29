import { makeSignupValidation } from '../../../../src/main/factory/signupValidationFactory';
import { CompareFieldsValidation } from '../../../../src/presentation/helpers/validators/CompareFieldValidation';
import { IValidation } from '../../../../src/presentation/helpers/validators/IValidation';
import { RequiredFieldValidation } from '../../../../src/presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../../../src/presentation/helpers/validators/ValidationComposite';

jest.mock('../../../../src/presentation/helpers/validators/ValidationComposite');

describe('SignupValidationFactory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeSignupValidation();
        const validations: IValidation[] = [];
        for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
            validations.push(new RequiredFieldValidation(field));
        }
        validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
