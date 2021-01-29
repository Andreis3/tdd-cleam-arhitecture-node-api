import { makeSignupValidation } from '../../../../src/main/factory/signupValidationFactory';
import { CompareFieldsValidation } from '../../../../src/presentation/helpers/validators/CompareFieldValidation';
import { EmailValidation } from '../../../../src/presentation/helpers/validators/EmailValidation';
import { IValidation } from '../../../../src/presentation/helpers/validators/IValidation';
import { RequiredFieldValidation } from '../../../../src/presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../../../src/presentation/helpers/validators/ValidationComposite';
import { IEmailValidator } from '../../../../src/presentation/protocols';

jest.mock('../../../../src/presentation/helpers/validators/ValidationComposite');

const makeEmailValidator = (): IEmailValidator => {
    class EmailValidatorStub implements IEmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }

    return new EmailValidatorStub();
};

describe('SignupValidationFactory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeSignupValidation();
        const validations: IValidation[] = [];
        for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
            validations.push(new RequiredFieldValidation(field));
        }
        validations.push(new EmailValidation('email', makeEmailValidator()));
        validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
