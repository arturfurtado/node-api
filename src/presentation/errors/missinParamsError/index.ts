export class MissingParamsError extends Error {
  constructor (parameterName: string) {
    super(`Missing parameter: ${parameterName}`)
    this.name = 'MissingParamsError'
  }
}
