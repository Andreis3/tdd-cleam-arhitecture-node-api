import { IHttpResponse } from '../protocols/IHttpRequestResponse';
import { ServerError, UnauthorizedError } from '../errors';

export const badRequest = (error: Error): IHttpResponse => ({
    statusCode: 400,
    body: error,
});

export const unauthorized = (): IHttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError(),
});

export const serverError = (error: Error): IHttpResponse => ({
    statusCode: 500,
    body: new ServerError(error.stack),
});

export const ok = (data: any): IHttpResponse => ({
    statusCode: 201,
    body: data,
});
