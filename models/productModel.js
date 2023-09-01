const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema(
    {
        name : String,
        price : Number,
        imgUrls : [], 
        shippingFee : Number,
        category : String
    },
    {timestamps : true}
)

const Products = mongoose.model("products", productsSchema)
module.exports = Products