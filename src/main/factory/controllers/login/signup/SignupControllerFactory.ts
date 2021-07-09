import { SignUpController } from '../../../../../presentation/controllers/login/signup/SignupController';
import { IController } from '../../../../../presentation/protocols';
import { makeSignupValidation } from './SignupValidationFactory';
import { makeDbAuthentication } from '../../../use-cases/account/db-authentication/DbAuthenticateFactory';
import { makeDbAddAccount } from '../../../use-cases/account/add-account/DbAddAccountFactory';
import { makeLogControllerDecorator } from '../../../decorators/logs/LogControllerDecoratorFactory';

export const makeSignupController = (): IController => {
    const controller = new SignUpController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication());
    return makeLogControllerDecorator(controller);
};
