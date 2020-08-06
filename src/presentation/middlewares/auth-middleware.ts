import { Middleware } from '../protocols/middleware'
import { forbidden } from '../helpers/http/http-helper'
import { AccessDenied } from '../errors'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }
    return forbidden(new AccessDenied())
  }
}
