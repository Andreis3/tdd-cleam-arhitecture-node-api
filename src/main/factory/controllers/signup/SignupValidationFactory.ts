import {
    CompareFieldsValidation,
    ValidationComposite,
    RequiredFieldValidation,
    EmailValidation,
} from '../../../../presentation/helpers/validators';
import { IValidation } from '../../../../presentation/protocols/IValidation';
import { EmailValidatorAdapter } from '../../../adapters/validators/EmailValidatorAdapter';

export const makeSignupValidation = (): ValidationComposite => {
    const validations: IValidation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));

    return new ValidationComposite(validations);
};
