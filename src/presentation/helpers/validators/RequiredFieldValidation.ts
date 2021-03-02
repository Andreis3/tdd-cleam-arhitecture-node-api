import { MissingParamError } from '../../errors/Index';
import { IValidation } from '../../protocols/IValidation';

export class RequiredFieldValidation implements IValidation {
    constructor(private readonly fieldName: string) {
        this.fieldName = fieldName;
    }

    validate(input: any): Error {
        if (!input[this.fieldName]) {
            return new MissingParamError(this.fieldName);
        }
    }
}
