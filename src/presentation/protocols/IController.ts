import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/IHttpRequestResponse';

export interface IController {
    handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
