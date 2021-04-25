import { ObjectId } from 'bson'
import MongoDB from '../mongodb'

export class AccountRepository {
  get accountsCollection() {
    return MongoDB.getCollection('accounts')
  }

  async insert(name: string, email: string, password: string) {
    return await MongoDB.getCollection('accounts').insertOne(
      {
        name,
        email,
        password,
      },
      { serializeFunctions: true }
    )
  }

  async insertOauth2(name: string, email: string) {
    return await this.accountsCollection.insertOne(
      {
        name,
        email,
      },
      { serializeFunctions: true }
    )
  }

  async findByEmail(email: string) {
    return await this.accountsCollection.findOne(
      { email },
      { projection: { email: 1, password: 1, _id: 1 } }
    )
  }

  async findById(id: string) {
    return await this.accountsCollection.findOne(new ObjectId(id), {
      projection: { name: 1, email: 1, _id: 0 },
    })
  }
}
