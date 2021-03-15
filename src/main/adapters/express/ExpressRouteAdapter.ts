import { IController, IHttpRequest } from '../../../presentation/protocols';
import { Request, Response } from 'express';

export const adapterRoute = (controller: IController) => {
    return async (req: Request, res: Response) => {
        const httpRequest: IHttpRequest = {
            body: req.body,
        };
        const httpResponse = await controller.handle(httpRequest);
        if ([200, 201, 204].includes(httpResponse.statusCode)) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message,
            });
        }
    };
};
