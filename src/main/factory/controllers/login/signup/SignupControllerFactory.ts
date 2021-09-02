import { SignUpController } from '@/presentation/controllers/login/signup/SignupController';
import { IController } from '@/presentation/protocols';
import { makeSignupValidation } from '@/main/factory/controllers/login/signup/SignupValidationFactory';
import { makeDbAuthentication } from '@/main/factory/use-cases/account/db-authentication/DbAuthenticateFactory';
import { makeDbAddAccount } from '@/main/factory/use-cases/account/add-account/DbAddAccountFactory';
import { makeLogControllerDecorator } from '@/main/factory/decorators/logs/LogControllerDecoratorFactory';

export const makeSignupController = (): IController => {
    const controller = new SignUpController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication());
    return makeLogControllerDecorator(controller);
};
