import { Router } from 'express'
import { addTaskController } from '../controllers/add-task-controller'
import { deleteTaskController } from '../controllers/delete-task-controller'
import { loadTaskController } from '../controllers/load-task-controller'
import { updateTaskController } from '../controllers/update-task-controller'
import { authMiddleware } from '../middlewares/auth-middleware'

export default (router: Router) => {
  router.get('/task', authMiddleware, loadTaskController)
  router.post('/task', authMiddleware, addTaskController)
  router.delete('/task', authMiddleware, deleteTaskController)
  router.patch('/task', authMiddleware, updateTaskController)
}
