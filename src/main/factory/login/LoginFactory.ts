import env from '../../../main/config/env';
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';
import { makeLoginValidation } from './LoginValidationFactory';
import { IController } from '../../../presentation/protocols';
import { DbAuthentication } from '../../../data/use-cases/authentication/DbAuthenticate';
import { LoginController } from '../../../presentation/controllers/login/LoginController';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/AccountMongoRepository';
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/BcryptAdapter';
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/JwtAdapter';

export const makeLoginController = (): IController => {
    const salt = 12;
    const accountMongoRepository = new AccountMongoRepository();
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const dbAuthentication = new DbAuthentication(
        accountMongoRepository,
        bcryptAdapter,
        jwtAdapter,
        accountMongoRepository,
    );
    const loginController = new LoginController(makeLoginValidation(), dbAuthentication);
    const logMongoRepository = new LogMongoRepository();
    return new LogControllerDecorator(loginController, logMongoRepository);
};
