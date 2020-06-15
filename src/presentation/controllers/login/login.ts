import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { EmailValidator } from '../signup/signup-protocols'
import { Authentication } from '../../../domain/usecases/authentication'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return await new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('email')))
        )
      }

      if (!password) {
        return await new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('password')))
        )
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return await new Promise((resolve) =>
          resolve(badRequest(new InvalidParamError('email')))
        )
      }

      await this.authentication.auth(email, password)
      return new Promise((resolve) => resolve())
    } catch (error) {
      return serverError(error)
    }
  }
}