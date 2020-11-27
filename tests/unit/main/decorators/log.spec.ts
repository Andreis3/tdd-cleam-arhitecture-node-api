import { LogControllerDecorator } from '../../../../src/main/decorators/log';
import { IController, IHttpRequest, IHttpResponse } from '../../../../src/presentation/protocols';
import { serverError } from '../../../../src/presentation/helpers/httpHelpers';
import { ILogErrorRepository } from '../../../../src/data/protocols/ILogErrorRepository';

const makeController = (): IController => {
    class ControllerStub implements IController {
        async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
            const httpResponse: IHttpResponse = {
                statusCode: 200,
                body: {
                    name: 'Test-Name',
                },
            };
            return Promise.resolve(httpResponse);
        }
    }

    return new ControllerStub();
};

const makeLogErrorRepository = (): ILogErrorRepository => {
    class LogErrorRepositoryStub implements ILogErrorRepository {
        async logError(stack: string): Promise<void> {
            return new Promise(resolve => resolve());
        }
    }
    return new LogErrorRepositoryStub();
};

interface ISutTypes {
    sut: LogControllerDecorator;
    controllerStub: IController;
    logErrorRepositoryStub: ILogErrorRepository;
}

const makeSut = (): ISutTypes => {
    const controllerStub = makeController();
    const logErrorRepositoryStub = makeLogErrorRepository();
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
    return {
        sut,
        controllerStub,
        logErrorRepositoryStub,
    };
};

describe('LogController Decorator', () => {
    test('should call controller handle', async () => {
        const { sut, controllerStub } = makeSut();
        const handleSpy = jest.spyOn(controllerStub, 'handle');

        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        await sut.handle(httpRequest);

        expect(handleSpy).toHaveBeenCalledWith(httpRequest);
    });

    test('should return the same result of the controller', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        const httpResponse = await sut.handle(httpRequest);

        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {
                name: 'Test-Name',
            },
        });
    });

    test('should call logErrorRepository with correct error if controller returns a server error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
        const fakeError = new Error();
        fakeError.stack = 'any_error';
        const error = serverError(fakeError);
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)));
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');

        const httpRequest = {
            body: {
                email: 'any_email@mail.com',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password',
            },
        };
        await sut.handle(httpRequest);

        expect(logSpy).toHaveBeenCalledWith('any_error');
    });
});
