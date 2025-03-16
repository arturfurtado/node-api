import { HttpRequest, HttpResponse } from '../../protocols'

export class SignUpController {
  handle (HttpRequest: HttpRequest): HttpResponse {
    if (!HttpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing parameter: name')
      }
    }
    if (!HttpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing parameter: email')
      }
    }
    return {
      statusCode: 200,
      body: 'User successfully created'
    }
  }
}
