import { makeLoginValidation } from '@/main/factory/controllers/login/login/LoginValidationFactory';
import { IController } from '@/presentation/protocols';
import { LoginController } from '@/presentation/controllers/login/login/LoginController';
import { makeDbAuthentication } from '@/main/factory/use-cases/account/db-authentication/DbAuthenticateFactory';
import { makeLogControllerDecorator } from '@/main/factory/decorators/logs/LogControllerDecoratorFactory';

export const makeLoginController = (): IController => {
    const controller = new LoginController(makeLoginValidation(), makeDbAuthentication());
    return makeLogControllerDecorator(controller);
};
