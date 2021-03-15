import { IController } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/logs/LogControllerDecoratorFactory';
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/AddSurveyController';
import { makeAddSurveyValidation } from './AddSurveyValidationFactory';
import { makeDbAddSurvey } from '../../use-cases/add-survey/DbAddSurveyFactory';

export const makeAddSurveyController = (): IController => {
    const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey());
    return makeLogControllerDecorator(controller);
};
