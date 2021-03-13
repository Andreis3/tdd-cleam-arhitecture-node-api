import { SignUpController } from '../../../../presentation/controllers/signup/SignupController';
import { IController } from '../../../../presentation/protocols';
import { makeSignupValidation } from './SignupValidationFactory';
import { makeDbAuthentication } from '../../use-cases/db-authentication/DbAuthenticateFactory';
import { makeDbAddAccount } from '../../use-cases/add-account/db-add-account-factory';
import { makeLogControllerDecorator } from '../../decorators/logs/LogControllerDecoratorFactory';

export const makeSignupController = (): IController => {
    const controller = new SignUpController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication());
    return makeLogControllerDecorator(controller);
};
