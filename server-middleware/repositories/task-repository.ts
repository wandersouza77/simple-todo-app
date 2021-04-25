import { ObjectId } from 'mongodb'
import MongoDB from '../mongodb'

export class TaskRepository {
  get tasksCollection() {
    return MongoDB.getCollection('tasks')
  }

  async insert(accountId: string, content: string) {
    return await MongoDB.getCollection('tasks').insertOne(
      {
        accountId,
        content,
        completed: false,
        date: new Date(),
      },
      { serializeFunctions: true }
    )
  }

  async findById(taskId: string) {
    return await this.tasksCollection.findOne(
      { _id: taskId },
      { projection: { content: 1, completed: 1, date: 1, _id: 1 } }
    )
  }

  async findAllByAccountId(accountId: string) {
    return await this.tasksCollection
      .find(
        { accountId },
        { projection: { content: 1, completed: 1, date: 1, _id: 1 } }
      )
      .toArray()
  }

  async findAllByEmail(email: string) {
    return await this.tasksCollection
      .find(
        { email },
        { projection: { content: 1, completed: 1, date: 1, _id: 1 } }
      )
      .toArray()
  }

  async remove(taskId: string) {
    await this.tasksCollection.findOneAndDelete({ _id: new ObjectId(taskId) })
  }

  async update(taskData: any) {
    return await this.tasksCollection.updateOne(
      { _id: new ObjectId(taskData._id) },
      { $set: { completed: taskData.completed } }
    )
  }
}
