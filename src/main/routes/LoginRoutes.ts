import { Router } from 'express';
import { adapterRoute } from '../adapters/express/ExpressRouteAdapter';
import { makeSignupController } from '../factory/controllers/signup/SignupControllerFactory';
import { makeLoginController } from '../factory/controllers/login/LoginControllerFactory';
export default (router: Router): void => {
    router.post('/signup', adapterRoute(makeSignupController()));
    router.post('/login', adapterRoute(makeLoginController()));
};
