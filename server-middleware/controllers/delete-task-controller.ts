import { Request, Response } from 'express'
import { taskService } from '../factories/task-factory'

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const tasks = await taskService().remove(id)

    return res.status(200).json(tasks)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
