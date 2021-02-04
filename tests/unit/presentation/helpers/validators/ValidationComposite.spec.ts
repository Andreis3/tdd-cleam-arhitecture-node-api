import { MissingParamError } from '../../../../../src/presentation/errors';
import { IValidation } from '../../../../../src/presentation/helpers/validators/IValidation';
import { ValidationComposite } from '../../../../../src/presentation/helpers/validators/ValidationComposite';

describe('Validation Composite ', () => {
    test('Should return an error if any validation fails', () => {
        class ValidationStub implements IValidation {
            validate(input: any): Error {
                return new MissingParamError('filed');
            }
        }

        const validationStub = new ValidationStub();
        const sut = new ValidationComposite([validationStub]);
        const error = sut.validate({ field: 'any_value' });
        expect(error).toEqual(new MissingParamError('filed'));
    });
});
