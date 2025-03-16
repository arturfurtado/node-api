import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamsError } from '../../errors/missinParamsError'
import { BadRequest } from '../../helper/httpHelper'

export class SignUpController {
  handle (HttpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'confirmPassword']
    for (const fields of requiredFields) {
      if (!HttpRequest.body?.[fields]) {
        return BadRequest(new MissingParamsError(fields))
      }
    }
    return {
      statusCode: 200,
      body: 'User successfully created'
    }
  }
}
