import { MissingParamError } from '../../../../../src/presentation/errors';
import { RequiredFieldValidation } from '../../../../../src/presentation/helpers/validators/RequiredFieldValidation';

describe('RequiredField Validation', () => {
    test('Should return a MissingParamError if validation fails', () => {
        const sut = new RequiredFieldValidation('Field');
        const error = sut.validate({ name: 'any_name' });
        expect(error).toEqual(new MissingParamError('Field'));
    });
});
