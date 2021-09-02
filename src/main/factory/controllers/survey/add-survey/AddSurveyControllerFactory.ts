import { IController } from '@/presentation/protocols';
import { makeLogControllerDecorator } from '@/main/factory/decorators/logs/LogControllerDecoratorFactory';
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/AddSurveyController';
import { makeAddSurveyValidation } from '@/main/factory/controllers/survey/add-survey/AddSurveyValidationFactory';
import { makeDbAddSurvey } from '@/main/factory/use-cases/survey/add-survey/DbAddSurveyFactory';

export const makeAddSurveyController = (): IController => {
    const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey());
    return makeLogControllerDecorator(controller);
};
