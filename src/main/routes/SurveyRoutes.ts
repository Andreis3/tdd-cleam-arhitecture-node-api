import { Router } from 'express';
import { adapterRoute } from '../adapters/ExpressRouteAdapter';
import { makeAddSurveyController } from '../factory/controllers/survey/add-survey/AddSurveyControllerFactory';
import { makeLoadSurveyController } from '../factory/controllers/survey/load-survey/LoadSurveyControllerFactory';
import { adminAuth } from '../middlewares/AdminAuth';
import { auth } from '../middlewares/Auth';

export default (router: Router): void => {
    router.post('/survey', adminAuth, adapterRoute(makeAddSurveyController()));
    router.get('/survey', auth, adapterRoute(makeLoadSurveyController()));
};
