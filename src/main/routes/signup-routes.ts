import { Router } from 'express';
import { makeSignupController } from '../factory/signupFactory';
import { adapterRoute } from '../adapters/expressRouteAdapter';
export default (router: Router): void => {
    router.post('/signup', adapterRoute(makeSignupController()));
};
