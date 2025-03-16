import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamsError } from '../../errors/missinParamsError'

export class SignUpController {
  handle (HttpRequest: HttpRequest): HttpResponse {
    if (!HttpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamsError('name')
      }
    }
    if (!HttpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamsError('email')
      }
    }
    return {
      statusCode: 200,
      body: 'User successfully created'
    }
  }
}
