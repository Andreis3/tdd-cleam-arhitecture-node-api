import {
    EmailValidation,
    ValidationComposite,
    RequiredFieldValidation,
} from '../../../presentation/helpers/validators';
import { IValidation } from '../../../presentation/protocols/IValidation';
import { EmailValidatorAdapter } from '../../../presentation/utils/emailValidatorAdapter';

export const makeLoginValidation = (): ValidationComposite => {
    const validations: IValidation[] = [];
    for (const field of ['email', 'password']) {
        validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

    return new ValidationComposite(validations);
};
