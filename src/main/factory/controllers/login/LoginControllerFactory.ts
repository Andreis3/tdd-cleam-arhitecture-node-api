import { makeLoginValidation } from './LoginValidationFactory';
import { IController } from '../../../../presentation/protocols';
import { LoginController } from '../../../../presentation/controllers/login/login/LoginController';
import { makeDbAuthentication } from '../../use-cases/db-authentication/DbAuthenticateFactory';
import { makeLogControllerDecorator } from '../../decorators/logs/LogControllerDecoratorFactory';

export const makeLoginController = (): IController => {
    const controller = new LoginController(makeLoginValidation(), makeDbAuthentication());
    return makeLogControllerDecorator(controller);
};
