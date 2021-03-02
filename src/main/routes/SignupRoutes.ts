import { Router } from 'express';
import { makeSignupController } from '../factory/signup/SignupFactory';
import { adapterRoute } from '../adapters/ExpressRouteAdapter';
export default (router: Router): void => {
    router.post('/signup', adapterRoute(makeSignupController()));
};
