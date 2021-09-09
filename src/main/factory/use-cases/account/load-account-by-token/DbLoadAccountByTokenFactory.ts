import { DbLoadAccountByToken } from '@/data/use-cases/account/load-account-by-token/DbLoadAccountByToken';
import { ILoadAccountByToken } from '@/domain/use-cases/account/ILoadAccountByToken';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/JwtAdapter';
import { AccountMongoRepository } from '@/infra/db/mongodb/account/AccountMongoRepository';
import env from '@/main/config/env';

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const accountMongoRepository = new AccountMongoRepository();

    return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
