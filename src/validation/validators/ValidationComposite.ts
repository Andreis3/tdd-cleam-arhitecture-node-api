import { IValidation } from '../../presentation/protocols/IValidation';

export class ValidationComposite implements IValidation {
    private readonly validation: IValidation[];

    constructor(private readonly validations: IValidation[]) {
        this.validation = validations;
    }

    validate(input: any): Error {
        for (const validation of this.validation) {
            const error = validation.validate(input);
            if (error) {
                return error;
            }
        }
    }
}
