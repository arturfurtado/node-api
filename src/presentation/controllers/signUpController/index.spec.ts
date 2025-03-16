import { SignUpController } from '.'

describe('SignUp Controller', () => {
  test('Should return status code 400 if name doesnt exists in body request', () => {
    const sut = new SignUpController()
    const HttpRequest = {
      body: {
        email: 'mail@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = sut.handle(HttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing parameter: name'))
  })
})

describe('SignUp Controller', () => {
  test('Should return status code 400 if email doesnt exists in body request', () => {
    const sut = new SignUpController()
    const HttpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = sut.handle(HttpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing parameter: email'))
  })
})

describe('SignUp Controller', () => {
  test('Should return status code 200 if all parameters are correct', () => {
    const sut = new SignUpController()
    const HttpRequest = {
      body: {
        name: 'name',
        email: 'email@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = sut.handle(HttpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toBe('User successfully created')
  })
})
