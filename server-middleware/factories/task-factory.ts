import { AccountRepository } from '../repositories/account-repository'
import { TaskRepository } from '../repositories/task-repository'
import { TaskService } from '../services/task-service'

export const taskService = () => {
  return new TaskService(new AccountRepository(), new TaskRepository())
}
