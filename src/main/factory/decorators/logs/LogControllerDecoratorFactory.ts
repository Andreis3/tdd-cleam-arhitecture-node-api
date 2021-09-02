import { LogControllerDecorator } from '@/main/decorators/logs/LogControllerDecorator';
import { LogMongoRepository } from '@/infra/db/mongodb/log/LogMongoRepository';
import { IController } from '@/presentation/protocols';

export const makeLogControllerDecorator = (controller: IController): IController => {
    const logMongoRepository = new LogMongoRepository();
    return new LogControllerDecorator(controller, logMongoRepository);
};
