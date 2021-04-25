// import { promisify } from 'util'
// import { createClient } from 'redis'

// export default {
//   redis: createClient(),

//   async get(key: string) {
//     const getAsync = promisify(this.redis.get).bind(this.redis)
//     return await getAsync(key)
//   },

//   set(key: string, value: string) {
//     this.redis.set(key, value)
//   },
// }
