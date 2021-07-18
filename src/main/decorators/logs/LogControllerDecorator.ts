import { IController, IHttpRequest, IHttpResponse } from '../../../presentation/protocols';
import { ILogErrorRepository } from '../../../data/protocols/db/log/ILogErrorRepository';

export class LogControllerDecorator implements IController {
    constructor(private readonly controller: IController, private readonly logErrorRepository: ILogErrorRepository) {
        this.controller = controller;
        this.logErrorRepository = logErrorRepository;
    }

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const httpResponse = await this.controller.handle(httpRequest);
        if ([500].includes(httpResponse.statusCode)) {
            await this.logErrorRepository.logError(httpResponse.body.stack);
        }

        return httpResponse;
    }
}
