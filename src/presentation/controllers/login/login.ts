import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('email')))
      )
    }

    if (!httpRequest.body.password) {
      return await new Promise((resolve) =>
        resolve(badRequest(new MissingParamError('password')))
      )
    }

    return new Promise((resolve) => resolve())
  }
}
