import { Request, Response } from 'express'
import { accountService } from '../factories/account-factory'
import { authenticationService } from '../factories/authentication-factory'

export const registerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Parametro inválido: nome' })
    }
    if (!email) {
      return res.status(400).json({ message: 'Parametro inválido: email' })
    }
    if (!password) {
      return res.status(400).json({ message: 'Parametro inválido: senha' })
    }

    const account = await accountService().add(name, email, password)

    if (!account) {
      return res.status(403).json({ message: 'Email em uso' })
    }

    const acessToken = await authenticationService().auth(email, password)

    return res.status(201).json(acessToken)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
