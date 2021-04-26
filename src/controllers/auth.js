import {
    Router
} from 'express'
import authService from '../services/auth'

const router = Router()
const auth = new authService()

router.post('/', async (req, res) => {
    const authToken = await auth.checkToken(req.body)
    res.status(authToken.status).send({
        info: authToken.info
    })
})

export default router