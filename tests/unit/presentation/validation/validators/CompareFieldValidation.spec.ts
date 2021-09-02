import { InvalidParamError } from '@/presentation/errors';
import { CompareFieldsValidation } from '@/validation/validators/CompareFieldValidation';

const makeSut = (): CompareFieldsValidation => {
    return new CompareFieldsValidation('field', 'filedToCompare');
};
describe('CompareFields Validation', () => {
    test('Should return a MissingParamError if validation fails', () => {
        const sut = makeSut();
        const error = sut.validate({
            field: 'any_value',
            filedToCompare: 'wrong_value',
        });
        expect(error).toEqual(new InvalidParamError('filedToCompare'));
    });

    test('Should not return if validation succeeds', () => {
        const sut = makeSut();
        const error = sut.validate({
            field: 'any_value',
            filedToCompare: 'any_value',
        });
        expect(error).toBeFalsy();
    });
});
