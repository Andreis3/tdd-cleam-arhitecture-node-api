import { Router } from 'express';
import { adapterMiddleware } from '../adapters/ExpressMiddlewareAdapter';
import { adapterRoute } from '../adapters/ExpressRouteAdapter';
import { makeAddSurveyController } from '../factory/controllers/survey/add-survey/AddSurveyControllerFactory';
import { makeAuthMiddleware } from '../factory/middlewares/AuthMiddlewareFactory';

export default (router: Router): void => {
    const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'));

    router.post('/survey', adminAuth, adapterRoute(makeAddSurveyController()));
};
