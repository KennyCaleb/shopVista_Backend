const mongoose = require("mongoose")

const customersSchema = new mongoose.Schema(
    {
        name : {
            type :String,
            require : true
        },
        email : {
            type : String,
            require : true,
            unique : true,
            trim : true,
        },
        phoneNumber : {
            type : String,
            require : true
        },
        password : {
            type : String,
            require : true,
            minLength : 5
        }

    },
    {
        timestamps : true
    }
)

const Customers = mongoose.model("customers", customersSchema)
module.exports = Customers