import { Router } from 'express'
import { loginController } from '../controllers/login-controller'
import { logoutController } from '../controllers/logout-controller'
import { registerController } from '../controllers/register-controller'

export default (router: Router) => {
  router.post('/auth/register', registerController)
  router.post('/auth/login', loginController)
  router.get('/auth/logout', logoutController)
}
