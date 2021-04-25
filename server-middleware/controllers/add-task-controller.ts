import { Request, Response } from 'express'
import { taskService } from '../factories/task-factory'

export const addTaskController = async (req: Request, res: Response) => {
  try {
    const { content } = req.body
    const newTask = await taskService().add(req.accountId, content)

    if (!newTask) {
      return res.status(401).send(false)
    }

    return res.status(200).json(true)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
