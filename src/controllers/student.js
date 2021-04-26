import {
    Router
} from 'express'
import studentService from '../services/student'
import authMiddleware from '../utils/authMiddleware'
import authService from '../services/auth'

const router = Router()
const student = new studentService()
const auth = new authService()

router.post('/login', async (req, res) => {
    const authStudent = await auth.studentLogin(req.body)
    res.status(authStudent.status).send({
        info: authStudent.info
    })
})

router.get("/:id", authMiddleware, async (req, res) => {
    const getStudent = await student.findOne(req.params)
    res.status(getStudent.status).send({
        info: getStudent.info
    })
})

export default router;