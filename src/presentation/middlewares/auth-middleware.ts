import { Middleware } from '../protocols/middleware'
import { forbidden } from '../helpers/http/http-helper'
import { AccessDenied } from '../errors'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise(resolve => resolve(forbidden(new AccessDenied())))
  }
}
