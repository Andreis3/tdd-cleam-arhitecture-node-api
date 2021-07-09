import { Router } from 'express';
import { adapterRoute } from '../adapters/ExpressRouteAdapter';
import { makeAddSurveyController } from '../factory/controllers/survey/add-survey/AddSurveyControllerFactory';

export default (router: Router): void => {
    router.post('/survey', adapterRoute(makeAddSurveyController()));
};
