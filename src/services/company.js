import HttpStatus from '../utils/HttpStatus'
import companyModel from '../models/company'
import {companyName} from '../utils/companyIndex'

class comapnyService {
    constructor() {
        this.company = companyModel
    }

    async create(data) {
        const findID = await this.company.findOne({
            name: data.name
        })
        if (findID)
            return new HttpStatus(400, 'This company already exits.')
        await this.company.create({...data, created_at: Date.now(), updated_at: Date.now()})
        return new HttpStatus(200, 'Create company success.')
    }

    async findAll(){
        const company = await this.company.find()
        return new HttpStatus(200, company)
    }

    async findOne(data){
        const findCompany = await this.company.findOne({name: companyName(data.id)})
        if(!findCompany)
            return new HttpStatus(400, 'This company is not exits.')
        return new HttpStatus(200, findCompany)
    }
}

export default comapnyService