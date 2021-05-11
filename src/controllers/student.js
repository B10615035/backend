import {
    Router
} from 'express'
import studentService from '../services/student'
import authMiddleware from '../utils/authMiddleware'
import authService from '../services/auth'
import logModel from '../models/log'
import {schedule} from '../utils/schedule'

const router = Router()
const student = new studentService()
const auth = new authService()
const log = logModel

router.post('/login', async (req, res) => {
    const authStudent = await auth.studentLogin(req.body)
    await log.create({identity:"student",name:req.body.name, id: req.body.id,action:'login', updated_at:Date.now()})
    res.status(authStudent.status).send({
        info: authStudent.info
    })
})

router.get("/schedule", authMiddleware, async (req, res) => {
    res.status(200).send({
        info: schedule
    })
})

router.put("/willing/:id", authMiddleware, async (req, res) => {
    const updateWilling = await student.update(req.params, req.body)
    res.status(updateWilling.status).send({
        info: updateWilling.info
    })
})

router.get("/:id", authMiddleware, async (req, res) => {
    const getStudent = await student.findOne(req.params)
    await log.create({identity:"student",name:"", id: req.params.id,action:'get', updated_at:Date.now()})
    res.status(getStudent.status).send({
        info: getStudent.info
    })
})

router.put("/:id", authMiddleware, async (req, res) => {
    const updateStudent = await student.update(req.params, req.body)
    await log.create({identity:"student",name:"", id: req.params.id ,action:'update', content: req.body.company, updated_at:Date.now()})
    res.status(updateStudent.status).send({
        info: updateStudent.info
    })
})

export default router;