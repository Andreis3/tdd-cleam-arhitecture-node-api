import { IHttpResponse } from '../protocols/IHttpRequestResponse';
export const badRequest = (error: Error): IHttpResponse => ({
    statusCode: 400,
    body: error,
});
