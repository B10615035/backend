import {model, Schema} from "mongoose"

const studentSchema = new Schema({
    name:{
        type:String,
        require: true,
    },
    id:{
        type:String,
        require: true,
        unique: true,
    },
    email:{
        type:String,
        require: true,
    },
    school:{
        type:String,
        require: true,
    },
    company:[String],
    last_login: Date,
    created_at: Date,
    updated_at: Date,
})

const studentModel = model('user', studentSchema)

export default studentModel