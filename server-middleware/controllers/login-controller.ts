import { Request, Response } from 'express'
import { authenticationService } from '../factories/authentication-factory'

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'missing param' })
    }

    const account = await authenticationService().auth(email, password)

    if (!account) {
      return res.status(403).json({ message: 'Credencial inválida!' })
    }
    return res.status(201).json(account)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
