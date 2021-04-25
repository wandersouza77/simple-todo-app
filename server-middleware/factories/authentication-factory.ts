import { AccountRepository } from '../repositories/account-repository'
import { AuthenticationService } from '../services/authentication-service'
import { CryptograpyService } from '../services/cryptography-service'

export const authenticationService = () => {
  return new AuthenticationService(
    new AccountRepository(),
    new CryptograpyService()
  )
}
