import fs from 'fs'
import path from 'path'
import express, { json, Router } from 'express'
import cors from 'cors'
import env from '../env'
import MongoDB from './mongodb'

const app = express()

app.use(json())

app.use(cors())

const routesPath = path.resolve(__dirname, 'routes')
const router = Router()
fs.readdirSync(routesPath).map(async (routeFile) => {
  ;(await import(`${routesPath}/${routeFile}`)).default(router)
  app.use('/api', router)
})
/* eslint-disable */
MongoDB.connect(String(env.mongoUrl))
  .then(() => console.log('mongo connected!'))
  .catch(console.error)

export default app
