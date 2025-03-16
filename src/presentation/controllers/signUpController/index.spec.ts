import { SignUpController } from '.'

describe('SignUp Controller', () => {
  test('Should return status code 400 if name doesnt existe in the body request', () => {
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
