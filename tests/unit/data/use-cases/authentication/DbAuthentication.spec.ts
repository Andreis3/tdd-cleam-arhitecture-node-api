import { resolve } from 'path';
import { ILoadAccountByEmailRepository } from '../../../../../src/data/protocols/ILoadAccountByEmailRepository';
import { DbAuthentication } from '../../../../../src/data/use-cases/authentication/DbAuthenticate';
import { IAccountModel } from '../../../../../src/domain/models/account';

describe('DbAuthentication Usecase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
            async load(email: string): Promise<IAccountModel> {
                const account: IAccountModel = {
                    id: 'any_id',
                    name: 'any_name',
                    email: 'any_email@mail.com',
                    password: 'any_password',
                };
                return new Promise(resolve => resolve(account));
            }
        }

        const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub();
        const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
        await sut.auth({
            email: 'any_email@mail.com',
            password: 'any_password',
        });

        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
    });
});
