import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { makeLoginValidation } from '@/main/factory/controllers/login/login/LoginValidationFactory';
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

describe('LoginValidationFactory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeLoginValidation();
        const validations: IValidation[] = [];
        for (const field of ['email', 'password']) {
            validations.push(new RequiredFieldValidation(field));
        }

        validations.push(new EmailValidation('email', makeEmailValidator()));
        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
