import { adapterMiddleware } from '../adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '../factory/middlewares/AuthMiddlewareFactory';

export const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'));
