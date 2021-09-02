import { Router } from 'express';
import { adapterRoute } from '@/main/adapters/ExpressRouteAdapter';
import { makeSignupController } from '@/main/factory/controllers/login/signup/SignupControllerFactory';
import { makeLoginController } from '@/main/factory/controllers/login/login/LoginControllerFactory';
export default (router: Router): void => {
    router.post('/signup', adapterRoute(makeSignupController()));
    router.post('/login', adapterRoute(makeLoginController()));
};
