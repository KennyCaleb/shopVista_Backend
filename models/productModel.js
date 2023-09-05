const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema(
    {
        name : String,
        price : String,
        imgUrls : [], 
        shippingFee : Number,
        category : String
    },
    {timestamps : true}
)

const Products = mongoose.model("products", productsSchema)
module.exports = Products