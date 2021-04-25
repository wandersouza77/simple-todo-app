import { Request, Response } from 'express'
import { accountService } from '../factories/account-factory'

export const accountController = async (req: Request, res: Response) => {
  try {
    const account = await accountService().load(req.accountId)

    if (!account) {
      return res.status(401).send(false)
    }

    return res.status(200).json({ account })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
