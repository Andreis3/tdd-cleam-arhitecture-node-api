import { makeLoginValidation } from '../../../../../src/main/factory/login/loginValidationFactory';
import { EmailValidation } from '../../../../../src/presentation/helpers/validators/EmailValidation';
import { IValidation } from '../../../../../src/presentation/protocols/IValidation';
import { RequiredFieldValidation } from '../../../../../src/presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../../../../src/presentation/helpers/validators/ValidationComposite';
import { IEmailValidator } from '../../../../../src/presentation/protocols';

jest.mock('../../../../../src/presentation/helpers/validators/ValidationComposite');

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
