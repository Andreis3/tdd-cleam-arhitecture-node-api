import {
    CompareFieldsValidation,
    EmailValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from '../../../../../src/presentation/helpers/validators/Index';
import { makeSignupValidation } from '../../../../../src/main/factory/signup/SignupValidationFactory';
import { IValidation } from '../../../../../src/presentation/protocols/IValidation';
import { IEmailValidator } from '../../../../../src/presentation/protocols/Index';

jest.mock('../../../../../src/presentation/helpers/validators/ValidationComposite');

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
