import express from 'express'
import mongoDB from './src/configs/database'
import cors from 'cors'
import router from './src/configs/routes'

const app = express()
const db = new mongoDB();

app.use(express.json())

app.use(cors({ origin: '*', credentials: true}))

app.listen(8001, () => {
  console.log("connect backend success")
})

db.dbConnection()

router.forEach(route => {
  app.use(route.prefix, route.router)
})