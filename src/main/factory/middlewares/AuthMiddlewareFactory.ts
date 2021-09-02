import { AuthMiddleware } from '@/presentation/middleware/AuthMiddleware';
import { IMiddleware } from '@/presentation/protocols';
import { makeDbLoadAccountByToken } from '@/main/factory/use-cases/account/load-account-by-token/DbLoadAccountByTokenFactory';

export const makeAuthMiddleware = (role?: string): IMiddleware => {
    return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};
