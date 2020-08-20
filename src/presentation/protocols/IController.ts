import { IHttpRequest, IHttpResponse } from '../protocols/IHttpRequestResponse';

export interface IController {
    handle(httpRequest: IHttpRequest): IHttpResponse;
}
