import { NextFunction, Request, Response } from 'express'
import { authenticationService } from '../factories/authentication-factory'
// import { authenticationService } from '../factories/authentication-factory'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization ?? null

    if (!token) {
      return res.status(400).json(false)
    }

    const account = await authenticationService().verifyToken(token)

    if (typeof account === 'string' || account === null) {
      return res.status(401).json(false)
    }

    if (account) {
      req.accountId = account._id ?? account.id
    }

    next()
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
