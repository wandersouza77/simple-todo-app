import { Request, Response } from 'express'
export const logoutController = (req: Request, res: Response): Response => {
  try {
    req.accountId = ''

    return res.status(200).json(true)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
