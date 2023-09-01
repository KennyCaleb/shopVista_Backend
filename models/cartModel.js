const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
    {
        customerId : mongoose.Schema.Types.ObjectId,
        productId : mongoose.Schema.Types.ObjectId,
        qty : Number
    },
    {
        timestamps : true
    }
)

const Cart = mongoose.model("cart", cartSchema)
module.exports = Cart