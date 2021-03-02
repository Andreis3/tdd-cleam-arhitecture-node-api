import { SignUpController } from '../../../presentation/controllers/signup/SignupController';
import { DbAddAccount } from '../../../data/use-cases/add-account/DbAddAccount';
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/BcryptAdapter';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/AccountMongoRepository';
import { LogMongoRepository } from '../../../infra/db/mongodb/log/LogMongoRepository';
import { IController } from '../../../presentation/protocols/Index';
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';
import { makeSignupValidation } from './SignupValidationFactory';

export const makeSignupController = (): IController => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const accountMongoRepository = new AccountMongoRepository();
    const logMongoRepository = new LogMongoRepository();
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
    const signUpController = new SignUpController(dbAddAccount, makeSignupValidation());

    return new LogControllerDecorator(signUpController, logMongoRepository);
};
