import axios from 'axios'
import { accountService } from '../factories/account-factory'
import { AccountRepository } from '../repositories/account-repository'
import { CryptograpyService } from './cryptography-service'

export class AuthenticationService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly cryptograpyService: CryptograpyService
  ) {}

  async auth(email: string, password: string) {
    const account = await this.accountRepository.findByEmail(email)

    if (account) {
      const validAccount = this.cryptograpyService.compare(
        password,
        account.password
      )
      if (validAccount) {
        const token = this.cryptograpyService.encrypt(
          account._id,
          account.email
        )
        return {
          token,
          name: account.email,
        }
      }
    }
    return null
  }

  async oauth2(email: string) {
    const account = await this.accountRepository.findByEmail(email)

    if (account) {
      const token = this.cryptograpyService.encrypt(account._id, account.email)
      return {
        token,
        name: account.email,
      }
    }
    return null
  }

  async verifyToken(token: string) {
    if (token.split(' ')[0] === 'Bearer') {
      return await this.verifyOauth2Token(token)
    }
    return this.cryptograpyService.decrypt(token)
  }

  async verifyOauth2Token(token: string) {
    const account = await axios({
      method: 'GET',
      url: 'https://discord.com/api/users/@me',
      headers: {
        Authorization: token,
      },
    })

    if (!account.data.email) {
      return null
    }

    const alreadyExists = await this.accountRepository.findByEmail(
      account.data.email
    )

    if (alreadyExists) {
      return alreadyExists
    }

    const newAccount = await accountService().addOauth2(
      account.data.username,
      account.data.email
    )

    return newAccount?.ops[0]
  }
}
