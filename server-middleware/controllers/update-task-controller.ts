import { Request, Response } from 'express'
import { taskService } from '../factories/task-factory'

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { taskData } = req.body

    await taskService().update(taskData)

    return res.status(200).json(true)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
