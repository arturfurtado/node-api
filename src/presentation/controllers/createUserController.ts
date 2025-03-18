import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamsError, InvalidParamError } from '../errors'
import { BadRequest, internalServerErrorResponse } from '../helper/http'
export class CreateUserController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (HttpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']
      for (const fields of requiredFields) {
        if (!HttpRequest.body?.[fields]) {
          return BadRequest(new MissingParamsError(fields))
        }
      }
      if (HttpRequest.body.password !== HttpRequest.body.confirmPassword) {
        return BadRequest(new InvalidParamError('passwords arent equal'))
      }
      const isEmailValid = this.emailValidator.isValid(HttpRequest?.body?.email)
      if (!isEmailValid) {
        return BadRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return internalServerErrorResponse()
    }
    return {
      statusCode: 200,
      body: 'User successfully created'
    }
  }
}
