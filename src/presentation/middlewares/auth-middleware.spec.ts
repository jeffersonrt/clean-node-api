import { forbidden } from '../helpers/http/http-helper'
import { AccessDenied } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { AccountModel } from '../../domain/models/account'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_mail@mail.com',
  password: 'valid_password'
})

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (token: string, role?: string): Promise<AccountModel> {
        return await new Promise(resolve => resolve(makeFakeAccount()))
      }
    }
    const loadAccountByToken = new LoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByToken)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDenied()))
  })

  test('Should call LoadAccountByToken with correct AccessToken', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (token: string, role?: string): Promise<AccountModel> {
        return await new Promise(resolve => resolve(makeFakeAccount()))
      }
    }

    const loadAccountByToken = new LoadAccountByTokenStub()
    const loadSpy = jest.spyOn(loadAccountByToken, 'load')
    const sut = new AuthMiddleware(loadAccountByToken)
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toBeCalledWith('any_token')
  })
})
