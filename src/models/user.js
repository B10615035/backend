import {model, Schema} from "mongoose"

const userSchems = new Schema({
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
    phone:{
        type:String,
        require: true,
    },
    last_login: Date,
    created_at: Date,
    updated_at: Date,
})

const userModel = model('user', userSchems)

export default userModel