const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const Customers = require("../models/userModel")


// register new customer
router.post("/signup", asyncHandler(async(req, res)=>{

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

// login customer
router.post("/signin", asyncHandler(async(req, res)=>{
  const {email, password} = req.body

  // check if email exist
  const isEmailExist = await Customers.findOne({email})

  // if true
    if(isEmailExist && isEmailExist.password === password){
      res.status(200).json({msg:"User successfully logged in.", user : isEmailExist})
    }
  // else
  else{
    res.status(400).json({msg:"Invalid credentials", user : req.body})
  }

}))


// get customers
router.get("/", asyncHandler(async(req, res)=>{

    const customers = await Customers.find()
    res.status(200).json({msg:"All Customers", customers})

}))

// get customer
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


// const update customer
router.put("/:customerId", asyncHandler(async(req, res)=>{
    const {customerId} = req.params

    const updatedCustomer = await Customers.findOneAndUpdate({_id:customerId}, req.body, {new :  true, runValidators:true})

    if(updatedCustomer){
      res.status(200).json({msg:`customer ${customerId} successfully updated`, updatedCustomer})
    }
    else{
      res.status(400).json({msg:`error updating customer ${customerId}`})
    }
}))

// delete customer
router.delete("/:customerId", asyncHandler(async(req, res)=>{
  const customerId = req.params

  const deletedCustomer = await Customers.findOneAndDelete({_id:customerId})

  if(deletedCustomer){
    res.status(200).json({msg:`customer ${customerId} successfully deleted`})
  }
  else{
    res.status(400).json({msg:`error deleting customer ${customerId}`})
  }
}))


module.exports = router