import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamsError } from '../../errors/missinParamsError'
import { BadRequest } from '../../helper/httpHelper'
import { EmailValidator } from '../../protocols/emailValidator'
import { Controller } from '../../protocols/controller'
import { InvalidParamError } from '../../errors/invalidParamError'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (HttpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'confirmPassword']
    for (const fields of requiredFields) {
      if (!HttpRequest.body?.[fields]) {
        return BadRequest(new MissingParamsError(fields))
      }
    }
    const isEmailValid = this.emailValidator.isValid(HttpRequest?.body?.email)
    if (!isEmailValid) {
      return BadRequest(new InvalidParamError('email'))
    }
    return {
      statusCode: 200,
      body: 'User successfully created'
    }
  }
}
