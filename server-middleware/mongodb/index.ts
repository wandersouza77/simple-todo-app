import { MongoClient } from 'mongodb'

export default {
  client: (null as unknown) as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  },

  async disconect() {
    await this.client.close()
  },

  getCollection(collectionName: string) {
    return this.client.db().collection(collectionName)
  },

  serialize(data: any): any {
    const { _id, ...rest } = data
    return { ...rest, id: _id }
  },
}
