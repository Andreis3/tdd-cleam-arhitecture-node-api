import { IHttpResponse } from '@/presentation/protocols/IHttpRequestResponse';
import { ServerError, UnauthorizedError } from '@/presentation/errors';

export const badRequest = (error: Error): IHttpResponse => ({
    statusCode: 400,
    body: error,
});

export const forbidden = (error: Error): IHttpResponse => ({
    statusCode: 403,
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

export const create = (data: any): IHttpResponse => ({
    statusCode: 201,
    body: data,
});

export const ok = (data: any): IHttpResponse => ({
    statusCode: 200,
    body: data,
});

export const noContent = (): IHttpResponse => ({
    statusCode: 204,
    body: null,
});
