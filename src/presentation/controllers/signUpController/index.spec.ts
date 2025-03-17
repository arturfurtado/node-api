import { SignUpController } from '.'
import { InvalidParamError } from '../../errors/invalidParamError'
import { MissingParamsError } from '../../errors/missinParamsError'
import { EmailValidator } from '../../protocols/emailValidator'

interface SutTypes {
  sut: SignUpController
  emailValidator: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidator = new EmailValidatorStub()
  const sut = new SignUpController(emailValidator)
  return {
    sut,
    emailValidator
  }
}

describe('SignUp Controller', () => {
  test('Should return status code 400 if name doesnt exists in body request', () => {
    const { sut } = makeSut()
    const HttpRequest = {
      body: {
        email: 'mail@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = sut.handle(HttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('name'))
  })
  test('Should return status code 400 if email doesnt exists in body request', () => {
    const { sut } = makeSut()
    const HttpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = sut.handle(HttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('email'))
  })

  test('Should return status code 400 if password doesnt exists in body request', () => {
    const { sut } = makeSut()
    const HttpRequest = {
      body: {
        name: 'name',
        email: 'email@mail.com',
        confirmPassword: 'password'
      }
    }
    const httpResponse = sut.handle(HttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('password'))
  })

  test('Should return status code 400 if confirmPassword doesnt exists in body request', () => {
    const { sut } = makeSut()
    const HttpRequest = {
      body: {
        name: 'name',
        email: 'email@mail.com',
        password: 'password'
      }
    }
    const httpResponse = sut.handle(HttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('confirmPassword'))
  })

  test('Should return status code 400 if emails isnt valid', () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)
    const HttpRequest = {
      body: {
        name: 'name',
        email: 'email@mail.com',
        password: 'password',
        confirmPassword: 'passwordConfirm'
      }
    }
    const httpResponse = sut.handle(HttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should return status code 200 if all parameters are correct', () => {
    const { sut } = makeSut()
    const HttpRequest = {
      body: {
        name: 'name',
        email: 'email@mail.com',
        password: 'password',
        confirmPassword: 'password'
      }
    }
    const httpResponse = sut.handle(HttpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe('User successfully created')
  })
})
