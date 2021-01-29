import { CompareFieldsValidation } from '../../presentation/helpers/validators/CompareFieldValidation';
import { IValidation } from '../../presentation/helpers/validators/IValidation';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite';

export const makeSignupValidation = (): ValidationComposite => {
    const validations: IValidation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
        validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));

    return new ValidationComposite(validations);
};
