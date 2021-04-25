import { Request, Response } from 'express'
import { taskService } from '../factories/task-factory'

export const loadTaskController = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService().load(req.accountId)

    if (!tasks) {
      return res.status(401).send(false)
    }

    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
