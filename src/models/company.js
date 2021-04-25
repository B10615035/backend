import {model, Schema} from "mongoose"

const companySchema = new Schema({
    name:{
        type:String,
        require: true,
    },
    students:[String],
    last_login: Date,
    updated_at: Date,
})

const companyModel = model('compnay', companySchema)

export default companyModel