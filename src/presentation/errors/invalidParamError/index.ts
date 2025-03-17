export class InvalidParamError extends Error {
  constructor (email: string) {
    super(`Invalid email: ${email}`)
    this.name = 'InvalidParamError'
  }
}
