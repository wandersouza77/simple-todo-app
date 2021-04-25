import { AccountRepository } from '../repositories/account-repository'
import { TaskRepository } from '../repositories/task-repository'

export class TaskService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  async add(accountId: string, content: string) {
    const validAccount = await this.accountRepository.findById(accountId)
    if (!validAccount) {
      return null
    }
    return await this.taskRepository.insert(accountId, content)
  }

  async load(id: string) {
    const validAccount = await this.accountRepository.findById(id)
    if (validAccount) {
      return await this.taskRepository.findAllByAccountId(id)
    }
    return null
  }

  async loadFromEmail(email: string) {
    const validAccount = await this.accountRepository.findByEmail(email)
    if (validAccount) {
      return await this.taskRepository.findAllByEmail(email)
    }
    return null
  }

  async remove(taskId: string) {
    const task = await this.taskRepository.remove(taskId)

    return task
  }

  async update(taskData: any) {
    return await this.taskRepository.update(taskData)
  }
}
