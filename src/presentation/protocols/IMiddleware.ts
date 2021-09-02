import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/IHttpRequestResponse';

export interface IMiddleware {
    handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
