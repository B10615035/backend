import studentModel from '../models/student'
import HttpStatus from '../utils/HttpStatus'

class studentService {
    constructor(){
        this.student = studentModel;
    }

    async findAll(){
        var student = await this.student.find()
        student = student.sort((a, b) => {
            if (a.id < b.id)
                return -1
            else
                return 0
        })
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
        const findID = await this.student.findOne(id)
        if(!findID)
            return new HttpStatus(400, 'This ID dose not exits.')
        await this.student.findOneAndRemove(id)
        return new HttpStatus(200, 'Delete student success.')
    }

    async update(id, data){
        const findID = await this.student.findOneAndUpdate(id,{...data, updated_at:Date.now()})
        if(!findID)
            return new HttpStatus(400, 'This student dose not exits.')
        return new HttpStatus(200, 'ζδΊ€ζε')
    }
}

export default studentService