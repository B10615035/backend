import {model, Schema} from "mongoose"

const companySchema = new Schema({
    name:{
        type:String,
        require: true,
    },
    students:[String],
    stage_one:[Array],
    willing_name:[String],
    willing_id:[String],
    willing_order:[Number],
    last_login: Date,
    updated_at: Date,
})

const companyModel = model('company', companySchema)

export default companyModel