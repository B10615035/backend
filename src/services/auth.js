import userModel from '../models/user'
import HttpStatus from '../utils/HttpStatus'
import jwt from 'jsonwebtoken'

class authService {
    constructor() {
        this.user = userModel
        this.SECRET = "secret"
    }

    async login(data) {
        const findUser = await this.user.findOne({name: data.name, id: data.id})
        if (!findUser)
            return new HttpStatus(400, 'This student is not exits.')
        
        const token = jwt.sign({id:data.id}, this.SECRET, {expiresIn: '3600s'})

        return new HttpStatus(200, token)
    }
}

export default authService