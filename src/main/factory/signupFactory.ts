import { SignUpController } from '../../presentation/controllers/signupController';
import { EmailValidatorAdapter } from '../../presentation/utils/emailValidatorAdapter';
import { DbAddAccount } from '../../data/use-cases/add-account/dbAddAccount';
import { BcryptAdapter } from '../../infra/cryptography/bcryptAdapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log';
import { IController } from '../../presentation/protocols';
import { LogControllerDecorator } from '../decorators/log';

export const makeSignupController = (): IController => {
    const salt = 12;
    const emailValidatorAdapter = new EmailValidatorAdapter();
    const bcryptAdapter = new BcryptAdapter(salt);
    const accountMongoRepository = new AccountMongoRepository();
    const logMongoRepository = new LogMongoRepository();
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
    const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount);

    return new LogControllerDecorator(signUpController, logMongoRepository);
};
