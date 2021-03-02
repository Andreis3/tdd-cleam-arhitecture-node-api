import {
    CompareFieldsValidation,
    ValidationComposite,
    RequiredFieldValidation,
    EmailValidation,
} from '../../../presentation/helpers/validators/Index';
import { IValidation } from '../../../presentation/protocols/IValidation';
import { EmailValidatorAdapter } from '../../../main/adapters/validators/EmailValidatorAdapter';

export const makeSignupValidation = (): ValidationComposite => {
    const validations: IValidation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));

    return new ValidationComposite(validations);
};
