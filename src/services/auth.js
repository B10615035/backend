import userModel from '../models/student'
import HttpStatus from '../utils/HttpStatus'
import jwt from 'jsonwebtoken'
import {companyIndex, companyName} from '../utils/companyIndex'
import companyModel from '../models/company'

class authService {
    constructor() {
        this.user = userModel
        this.company = companyModel
        this.SECRET = "secret"
    }

    async studentLogin(data) {
        const findUser = await this.user.findOne({name: data.name, id: data.id})
        if (!findUser)
            return new HttpStatus(400, 'This student is not exits.')
        
        const token = jwt.sign({id:data.id}, this.SECRET, {expiresIn: '3600s'})

        return new HttpStatus(200, token)
    }

    async companyLogin(data) {
        const findUser = await this.company.findOne({name: data.name})
        if (!findUser)
            return new HttpStatus(400, 'This company is not exits.')
        
        const token = jwt.sign({id:companyIndex(data.id)}, this.SECRET, {expiresIn: '3600s'})

        return new HttpStatus(200, token)
    }

    async manageLogin(data) {
        console.log(data)
        if(data.name == "admin" && data.password == "NTUST12345"){
            const token = jwt.sign({name:data.name, password: data.password}, this.SECRET, {expiresIn: '3600s'})
            return new HttpStatus(200, token)
        }
        else{
            return new HttpStatus(400, 'This manager is not exits.')
        }
    }
}

export default authService