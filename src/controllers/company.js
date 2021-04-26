import {
    Router
} from 'express'
import companyService from '../services/company'
import authMiddleware from '../utils/authMiddleware'
import authService from '../services/auth'

const router = Router()
const company = new companyService()
const auth = new authService()

router.post('/login', async (req, res) => {
    const authStudent = await auth.companyLogin(req.body)
    res.status(authStudent.status).send({
        info: authStudent.info
    })
})

router.get("/:id", authMiddleware, async (req, res) => {
    const getCompany = await company.findOne(req.params)
    res.status(getCompany.status).send({
        info: getCompany.info
    })
})

export default router