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
    // res.status(200).json({msg:"New Customer added successfully", newCustomer})
    if (newCustomer) {
      res.status(201).json({name, email, phoneNumber, password});
    } else {
      res.send({ msg: "User not created" });
    }


}))

// get users
router.get("/", asyncHandler(async(req, res)=>{

    const customers = await Customers.find()
    res.status(200).json({msg:"All Customers", customers})

}))

// get user
router.get("/:id", async (req, res) => {

  const id = req.params.id;

  const getCustomer = await Customers.findOne({ _id: id });

  if(getCustomer){
      res.status(200).json({msg : `customer ${id}`, customer : getCustomer })
  }
  
  else{
      res.status(400).send({msg :`cannot get customer - ${id}`})
  }
});

module.exports = router