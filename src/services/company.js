import HttpStatus from '../utils/HttpStatus'
import companyModel from '../models/company'
import studentModel from '../models/student'
import {
    companyName
} from '../utils/companyIndex'

class comapnyService {
    constructor() {
        this.company = companyModel
        this.student = studentModel
    }

    async create(data) {
        const findID = await this.company.findOne({
            name: data.name
        })
        if (findID)
            return new HttpStatus(400, 'This company already exits.')
        await this.company.create({
            ...data,
            created_at: Date.now(),
            updated_at: Date.now()
        })
        return new HttpStatus(200, 'Create company success.')
    }

    async findAll() {
        const company = await this.company.find()
        return new HttpStatus(200, company)
    }

    async findOne(data) {
        const name = companyName(data.id)
        const findCompany = await this.company.findOne({
            name: name
        })
        if (!findCompany)
            return new HttpStatus(400, 'This company is not exits.')

        var studentList = await this.student.find()

        studentList = studentList.sort((a, b) => {
            if (a.id < b.id)
                return -1
            else
                return 0
        })

        return new HttpStatus(200, {
            findCompany,
            studentList
        })
    }

    async update(id, data) {
        const name = companyName(id.id)
        const findID = await this.company.findOneAndUpdate({
            name: name
        }, {
            ...data,
            updated_at: Date.now()
        })
        if (!findID)
            return new HttpStatus(400, 'This company dose not exits.')
        return new HttpStatus(200, '提交成功')
    }
}

export default comapnyService