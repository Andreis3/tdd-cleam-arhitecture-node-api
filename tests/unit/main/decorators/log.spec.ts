import { LogControllerDecorator } from '../../../../src/main/decorators/log';
import { IController, IHttpRequest, IHttpResponse } from '../../../../src/presentation/protocols';

interface ISutTypes {
    sut: LogControllerDecorator;
    controllerStub: IController;
}

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

const makeSut = (): ISutTypes => {
    const controllerStub = makeController();
    const sut = new LogControllerDecorator(controllerStub);
    return {
        sut,
        controllerStub,
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
});
