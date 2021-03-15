import { IHttpRequest, IHttpResponse } from './IHttpRequestResponse';

export interface IMiddleware {
    handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
