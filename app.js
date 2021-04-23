import express from 'express'
import mongoDB from './src/configs/database'
import userModel from './src/models/user'
import cors from 'cors'

const app = express()
const db = new mongoDB();
const user = userModel

app.use(express.json())

app.use(cors({ origin: '*', credentials: true}))

app.listen(8001, () => {
  console.log("connect backend success")
})

db.dbConnection()

app.post('/registry', (req, res) => {
  console.log(req.body)
  user.create({...req.body, created_at: Date.now(), updated_at: Date.now(),}, (error) => {
    if(error){
      res.status(201).send({info:"准考證號碼不能重複"})
    }
    else{
      res.send({info:"成功新增學生"})
    }
  })
})