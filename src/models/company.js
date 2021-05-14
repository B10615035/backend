import {model, Schema} from "mongoose"

const companySchema = new Schema({
    name:{
        type:String,
        require: true,
    },
    id:String,
    students:[String],
    stage_one:[String],
    willing_name:[String],
    willing_id:[String],
    willing_order:[Number],
    last_login: Date,
    updated_at: Date,
})

const companyModel = model('company', companySchema)

export default companyModel