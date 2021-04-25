import { AccountRepository } from '../repositories/account-repository'
import { AccountService } from '../services/account-service'
import { cryptographyService } from './cryptography-factory'

export const accountService = () => {
  return new AccountService(new AccountRepository(), cryptographyService())
}
