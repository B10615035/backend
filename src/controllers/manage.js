import {
    Router
} from 'express'
import authService from '../services/auth'
import studentService from '../services/student'
import companyService from '../services/company'
import authMiddleware from '../utils/authMiddleware'

const router = Router()
const student = new studentService()
const auth = new authService()
const company = new companyService()

router.post('/login', async (req, res) => {
    const authManage = await auth.manageLogin(req.body)
    res.status(authManage.status).send({
        info: authManage.info
    })
})

router.post("/student/", authMiddleware, async (req, res) => {
    const createUser = await student.create(req.body)
    res.status(createUser.status).send({
        info: createUser.info
    })
})

router.get("/student", authMiddleware, async (req, res) => {
    const createUser = await student.findAll()
    res.status(createUser.status).send(createUser.info)
})

router.delete("/student/:id", authMiddleware, async (req, res) => {
    const deleteUser = await student.delete(req.params)
    res.status(deleteUser.status).send({
        info: deleteUser.info
    })
})

router.post("/company", authMiddleware, async (req, res) => {
    const createCompany = await company.create(req.body)
    res.status(createCompany.status).send({
        info: createCompany.info
    })
})

router.get("/company", authMiddleware, async (req, res) => {
    const getCompany = await company.findAll()
    res.status(getCompany.status).send(getCompany.info)
})

router.put("/company/:id", authMiddleware, async (req, res) => {
    const updateStudent = await company.update(req.params, req.body)
    res.status(updateStudent.status).send({
        info: updateStudent.info
    })
})

export default router