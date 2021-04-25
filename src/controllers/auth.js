import {
    Router
} from 'express'
import authService from '../services/auth'

const router = Router()
const auth = new authService()

router.post('/login', async (req, res) => {
    const authUser = await auth.login(req.body)
    res.status(authUser.status).send({
        info: authUser.info
    })
})

export default router