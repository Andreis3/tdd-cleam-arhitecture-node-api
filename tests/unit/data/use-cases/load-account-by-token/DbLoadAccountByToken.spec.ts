import { DbLoadAccountByToken } from '../../../../../src/data/use-cases/load-account-by-token/DbLoadAccountByToken';
import { IDecrypter } from '../../../../../src/data/protocols/cryptography/IDecrypter';

interface ISutTypes {
    sut: DbLoadAccountByToken;
    decrypterStub: IDecrypter;
}

const makeDecrypter = (): IDecrypter => {
    class DecrypterStub implements IDecrypter {
        async decrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('any_value'));
        }
    }

    return new DecrypterStub();
};

const makeSut = (): ISutTypes => {
    const decrypterStub = makeDecrypter();
    const sut = new DbLoadAccountByToken(decrypterStub);

    return {
        sut,
        decrypterStub,
    };
};

describe('DbLoadAccountByToken Usecase', () => {
    test('Should call Decrypter with correct values', async () => {
        const { sut, decrypterStub } = makeSut();

        const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt');
        await sut.load('any_token', 'any_role');

        expect(decrypterSpy).toHaveBeenCalledWith('any_token');
    });

    test('Should return null if Decrypter returns null', async () => {
        const { sut, decrypterStub } = makeSut();

        jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)));
        const account = await sut.load('any_token');

        expect(account).toBeNull();
    });
});
