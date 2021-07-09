import { IMiddleware, IHttpRequest } from '../../presentation/protocols';
import { NextFunction, Request, Response } from 'express';

export const adapterMiddleware = (middleware: IMiddleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: IHttpRequest = {
            headers: req.headers,
        };
        const httpResponse = await middleware.handle(httpRequest);
        if ([200].includes(httpResponse.statusCode)) {
            Object.assign(req, httpResponse.body);
            next();
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message,
            });
        }
    };
};
