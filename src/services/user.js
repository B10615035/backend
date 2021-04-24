import userModel from '../models/user'
import HttpStatus from '../utils/HttpStatus'

class userService {
    constructor(){
        this.user = userModel;
    }

    async findAll(){
        const users = await this.user.find()
        return new HttpStatus(200, users)
    }

    async create(data){
        const findID = await this.user.findOne({id: data.id})
        if(findID)
            return new HttpStatus(400, 'This ID already exits.')
        await this.user.create({...data, created_at: Date.now(), updated_at: Date.now()})
        return new HttpStatus(200, 'Create student is success.')
    }
}

export default userService