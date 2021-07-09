import { Router } from 'express';
import { adapterRoute } from '../adapters/ExpressRouteAdapter';
import { makeSignupController } from '../factory/controllers/login/signup/SignupControllerFactory';
import { makeLoginController } from '../factory/controllers/login/login/LoginControllerFactory';
export default (router: Router): void => {
    router.post('/signup', adapterRoute(makeSignupController()));
    router.post('/login', adapterRoute(makeLoginController()));
};
