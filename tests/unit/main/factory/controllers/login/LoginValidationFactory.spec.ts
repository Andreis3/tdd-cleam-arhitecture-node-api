import {
    EmailValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from '../../../../../../src/validation/validators';
import { makeLoginValidation } from '../../../../../../src/main/factory/controllers/login/login/LoginValidationFactory';
import { IValidation } from '../../../../../../src/presentation/protocols/IValidation';
import { IEmailValidator } from '../../../../../../src/presentation/protocols';

jest.mock('../../../../../../src/validation/validators/ValidationComposite');

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
