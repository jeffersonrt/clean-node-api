import { Router } from 'express'
import { makeSignUpControler } from '../factories/signup/signup-factory'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpControler()))
}
