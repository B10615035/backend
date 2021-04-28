import {model, Schema} from "mongoose"

const logSchema = new Schema({
    identity:{
        type:String,
        require: true,
    },
    name:{
        type:String,
        require: true,
    },
    id:{
        type:String,
        require: true,
    },
    action:{
        type:String,
        require: true,
    },
    content:[],
    updated_at: Date,
})

const logModel = model('log', logSchema)

export default logModel