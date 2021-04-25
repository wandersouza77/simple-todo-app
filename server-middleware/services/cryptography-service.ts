import { compareSync, hashSync } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import env from '../../env'

export class CryptograpyService {
  hash(text: string) {
    return hashSync(text, 10)
  }

  compare(text: string, hash: string) {
    return compareSync(text, hash)
  }

  encrypt(id: string, email: string) {
    return sign({ id, email }, String(env.apiSecret), {
      expiresIn: '30m',
    })
  }

  decrypt(token: string) {
    try {
      return <{ id: string }>verify(token, String(env.apiSecret))
    } catch (error) {
      return null
    }
  }
}
