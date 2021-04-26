import studentModel from '../models/student'
import HttpStatus from '../utils/HttpStatus'

class studentService {
    constructor(){
        this.student = studentModel;
    }

    async findAll(){
        const student = await this.student.find()
        return new HttpStatus(200, student)
    }

    async create(data){
        const findID = await this.student.findOne({id: data.id})
        if(findID)
            return new HttpStatus(400, 'This ID already exits.')
        await this.student.create({...data, created_at: Date.now(), updated_at: Date.now()})
        return new HttpStatus(200, 'Create student success.')
    }

    async findOne(data){
        const findID = await this.student.findOne({id: data.id})
        if(!findID)
            return new HttpStatus(400, 'This ID is not exits.')
        return new HttpStatus(200, findID)
    }

    async delete(id){
        const findID = await this.usstudenter.findOne(id)
        if(!findID)
            return new HttpStatus(400, 'This ID dose not exits.')
        await this.student.findOneAndRemove(id)
        return new HttpStatus(200, 'Delete student success.')
    }
}

export default studentService