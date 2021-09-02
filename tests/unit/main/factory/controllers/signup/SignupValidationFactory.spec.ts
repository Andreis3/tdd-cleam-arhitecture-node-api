import {
    CompareFieldsValidation,
    EmailValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from '@/validation/validators';
import { makeSignupValidation } from '@/main/factory/controllers/login/signup/SignupValidationFactory';
import { IValidation } from '@/presentation/protocols/IValidation';
import { IEmailValidator } from '@/presentation/protocols';

jest.mock('@/validation/validators/ValidationComposite');

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
