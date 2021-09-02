import { adapterMiddleware } from '@/main/adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '@/main/factory/middlewares/AuthMiddlewareFactory';

export const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'));
