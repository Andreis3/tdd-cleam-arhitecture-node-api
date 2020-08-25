import { IHttpResponse } from '../protocols/IHttpRequestResponse';
import { ServerError } from '../errors/serverError';

export const badRequest = (error: Error): IHttpResponse => ({
    statusCode: 400,
    body: error,
});

export const serverError = (): IHttpResponse => ({
    statusCode: 500,
    body: new ServerError(),
});

export const ok = (data: any): IHttpResponse => ({
    statusCode: 201,
    body: data,
});
