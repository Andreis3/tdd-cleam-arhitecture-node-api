import env from '../../../config/env';
import { DbAuthentication } from '../../../../data/use-cases/authentication/DbAuthenticate';
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/AccountMongoRepository';
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/BcryptAdapter';
import { JwtAdapter } from '../../../../infra/cryptography/jwt-adapter/JwtAdapter';
import { IAuthentication } from '../../../../domain/use-cases/IAuthentication';

export const makeDbAuthentication = (): IAuthentication => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const accountMongoRepository = new AccountMongoRepository();
    return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository);
};
