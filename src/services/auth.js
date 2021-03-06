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
        
        const token = jwt.sign({id:data.id}, this.SECRET, {expiresIn: '1800s'})

        return new HttpStatus(200, token)
    }

    async companyLogin(data) {
        console.log(data)
        const findUser = await this.company.findOne({name: data.name, id: data.id})
        if (!findUser)
            return new HttpStatus(400, 'This company is not exits.')
        
        const token = jwt.sign({id:companyIndex(data.name)}, this.SECRET, {expiresIn: '1800s'})

        return new HttpStatus(200, token)
    }

    async manageLogin(data) {
        console.log(data)
        if(data.name == "admin" && data.password == "NTUST12345"){
            const token = jwt.sign({name:data.name, password: data.password}, this.SECRET, {expiresIn: '180000s'})
            return new HttpStatus(200, token)
        }
        else{
            return new HttpStatus(400, 'This manager is not exits.')
        }
    }

    async verifyToken(token, secret){
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err)
                    reject(err);
                resolve(decoded);
            });
        });
    }

    async checkToken(data) {
        if(data.token == "login")
            return new HttpStatus(200, true)

        try {
            await this.verifyToken(data.token.replace('Bearer ', ''), "secret")
        } catch (error) {
            console.log(error)
            return new HttpStatus(400, false)
        }
        return new HttpStatus(200, true)
    }
}

export default authService