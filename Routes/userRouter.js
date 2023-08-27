const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const Customers = require("../models/userModel")



router.post("/", asyncHandler(async(req, res)=>{

    const {name, email, phoneNumber, password} = req.body

    const isEmailExist = await Customers.findOne({email : email})
    
    if(name=="" || email =="" || phoneNumber=="" || password=="") res.send({msg:"All fields are required"})
    else if(isEmailExist) res.send({msg : "Email already taken"})
    else if(password.length <= 4) res.send({ msg: "Password length shoud be greater than 4."});

    const newCustomer = await Customers.create({name, email, phoneNumber , password})
    res.status(200).json({msg:"New Customer added successfully", newCustomer})


}))

router.get("/", asyncHandler(async(req, res)=>{

    // const customers = await Customers.find()
    res.status(200).json({msg:"All Customers", customers : {
"id": 2,
"title": "Mens Casual Premium Slim Fit T-Shirts ",
"price": 22.3,
"description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
"rating": {
"rate": 4.1,
"count": 259
}
}})

}))

module.exports = router