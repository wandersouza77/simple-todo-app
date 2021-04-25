import 'dotenv/config'

export default {
  apiUrl: process.env.API_URL,
  apiSecret: process.env.API_SECRET,
  mongoUrl: process.env.MONGO_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}
