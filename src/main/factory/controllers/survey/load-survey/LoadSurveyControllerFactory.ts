import { IController } from '../../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../../decorators/logs/LogControllerDecoratorFactory';
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-survey/LoadSurveyController';
import { makeDbLoadSurvey } from '../../../use-cases/survey/load-survey/DbLoadSurveys';

export const makeLoadSurveyController = (): IController => {
    const controller = new LoadSurveysController(makeDbLoadSurvey());
    return makeLogControllerDecorator(controller);
};
