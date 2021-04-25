import { AccountRepository } from '../repositories/account-repository'
import { CryptograpyService } from './cryptography-service'

export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly cryptographyService: CryptograpyService
  ) {}

  async add(name: string, email: string, password: string) {
    const alreadyExists = await this.accountRepository.findByEmail(email)
    if (alreadyExists) {
      return null
    }
    const hashedPassword = this.cryptographyService.hash(password)
    const newAccount = await this.accountRepository.insert(
      name,
      email,
      hashedPassword
    )
    return newAccount
  }

  async addOauth2(name: string, email: string) {
    const alreadyExists = await this.accountRepository.findByEmail(email)
    if (alreadyExists) {
      return null
    }
    const newAccount = await this.accountRepository.insertOauth2(name, email)
    return newAccount
  }

  async load(id: string) {
    const account = await this.accountRepository.findById(id)
    if (account) {
      return account
    }
    return null
  }
}
