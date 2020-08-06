import { Middleware } from '../protocols/middleware'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDenied } from '../errors'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken)

        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDenied())
    } catch (error) {
      return serverError(error)
    }
  }
}
