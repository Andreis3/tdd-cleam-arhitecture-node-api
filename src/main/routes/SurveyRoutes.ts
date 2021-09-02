import { Router } from 'express';
import { adapterRoute } from '@/main/adapters/ExpressRouteAdapter';
import { makeAddSurveyController } from '@/main/factory/controllers/survey/add-survey/AddSurveyControllerFactory';
import { makeLoadSurveyController } from '@/main/factory/controllers/survey/load-survey/LoadSurveyControllerFactory';
import { adminAuth } from '@/main/middlewares/AdminAuth';
import { auth } from '@/main/middlewares/Auth';

export default (router: Router): void => {
    router.post('/survey', adminAuth, adapterRoute(makeAddSurveyController()));
    router.get('/survey', auth, adapterRoute(makeLoadSurveyController()));
};
