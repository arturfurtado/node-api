export class SignUpController {
  handle (HttpRequest: any): any {
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
  }
}
