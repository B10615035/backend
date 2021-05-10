import {
    Router
} from 'express'
import companyService from '../services/company'
import authMiddleware from '../utils/authMiddleware'
import authService from '../services/auth'
import logModel from '../models/log'
import {companyIndex, companyName} from '../utils/companyIndex'
import {schedule} from '../utils/schedule'

const router = Router()
const company = new companyService()
const auth = new authService()
const log = logModel

router.post('/login', async (req, res) => {
    const authStudent = await auth.companyLogin(req.body)
    await log.create({identity:"company",name:req.body.name, id: req.body.id,action:'login', updated_at:Date.now()})
    res.status(authStudent.status).send({
        info: authStudent.info
    })
})

router.get("/schedule", authMiddleware, async (req, res) => {
    res.status(200).send({
        info: schedule
    })
})

router.put("/willing", authMiddleware, async (req, res) => {
    const updateWilling = await company.update(req.params, req.body)
    res.status(updateWilling.status).send({
        info: updateWilling.info
    })
})

router.get("/:id", authMiddleware, async (req, res) => {
    const getCompany = await company.findOne(req.params)
    await log.create({identity:"company",name:companyName(req.params.id), id: "",action:'get', updated_at:Date.now()})
    res.status(getCompany.status).send({
        info: getCompany.info
    })
})

router.put("/:id", authMiddleware, async (req, res) => {
    const updateStudent = await company.update(req.params, req.body)
    await log.create({identity:"company",name:companyName(req.params.id), id: "",action:'update', content: req.body.students, updated_at:Date.now()})
    res.status(updateStudent.status).send({
        info: updateStudent.info
    })
})

export default router