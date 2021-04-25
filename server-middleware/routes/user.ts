import { Router } from 'express'
import { accountController } from '../controllers/account-controller'
import { authMiddleware } from '../middlewares/auth-middleware'

export default (router: Router) => {
  router.get('/user', authMiddleware, accountController)
}
