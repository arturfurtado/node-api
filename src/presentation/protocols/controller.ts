import { HttpResponse, HttpRequest } from './http'

export interface Controller {
  handle: (HttpRequest: HttpRequest) => HttpResponse
}
