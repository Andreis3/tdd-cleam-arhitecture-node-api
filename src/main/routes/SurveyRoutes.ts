import { Router } from 'express';
import { adapterRoute } from '../adapters/express/ExpressRouteAdapter';
import { makeAddSurveyController } from '../factory/controllers/add-survey/AddSurveyControllerFactory';

export default (router: Router): void => {
    router.post('/survey', adapterRoute(makeAddSurveyController()));
};
