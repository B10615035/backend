import {
    Router
} from 'express'
import userService from '../services/user'

const router = Router()
const user = new userService()

router.post("/", async (req, res) => {
    const createUser = await user.create(req.body)
    res.status(createUser.status).send({
        info: createUser.info
    })
})

router.get("/", async (req, res) => {
    const createUser = await user.findAll()
    res.status(createUser.status).send(createUser.info)
})

router.delete("/:id", async (req, res) => {
    console.log(req.params)
    const deleteUser = await user.delete(req.params)
    res.status(deleteUser.status).send({
        info: deleteUser.info
    })
})

export default router;