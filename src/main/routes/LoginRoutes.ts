import { Router } from 'express';
import { adapterRoute } from '../adapters/express/ExpressRouteAdapter';
import { makeSignupController } from '../factory/signup/SignupFactory';
import { makeLoginController } from '../factory/login/LoginFactory';
export default (router: Router): void => {
    router.post('/signup', adapterRoute(makeSignupController()));
    router.post('/login', adapterRoute(makeLoginController()));
};
