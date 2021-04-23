import {connect} from "mongoose"

class mongoDB {
    constructor(database) {
        this.url = "mongodb://127.0.0.1:27017/match"
        this.database = database
        this.options = {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }

    dbConnection() {
        connect(this.url, this.options)
            .then(() => {
                console.log(`Database connect success.`)
            }).catch((error) => {
                console.log(`Database connect error. ${error}`)
            })
    }
}

export default mongoDB;