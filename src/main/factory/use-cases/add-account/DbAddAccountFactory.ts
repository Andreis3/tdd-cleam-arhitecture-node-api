import { DbAddAccount } from '../../../../data/use-cases/add-account/DbAddAccount';
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/AccountMongoRepository';
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter/BcryptAdapter';
import { IAddAccount } from '../../../../domain/use-cases/IAddAccount';

export const makeDbAddAccount = (): IAddAccount => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const accountMongoRepository = new AccountMongoRepository();
    return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository);
};
