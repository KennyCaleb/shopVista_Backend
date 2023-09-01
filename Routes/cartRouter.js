const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const Cart = require("../models/cartModel")

// add item to cart
router.post("/:customerId/:productId", asyncHandler(async(req, res)=>{

    const {customerId, productId} = req.params

    // check if product in cart
    const getUserCart = await Cart.find({customerId:customerId}) //getting user's cart

    console.log(getUserCart)
    
    if(getUserCart){

        const isItemInCart = getUserCart.find(product=> String(product.productId)==productId)
        if(isItemInCart){ //if product in user's cart, do not add.
            res.send({msg:"Item in cart"})
        }
        else{ //else add
            const addToCart = await Cart.create({customerId, productId, qty : 1})
            res.status(400).json({msg:"Item added to cart", newCartItem : addToCart})
        }
    }
    else{
        res.status(400).send({msg: `cannot get user cart items ${customerId}`})
    }

}))

router.get("/:customerId", asyncHandler(async(req, res)=>{
    const customerId = req.params.customerId

    const getCustomerCart = await Cart.find({customerId})

    if(getCustomerCart){
        res.status(200).json({msg:`customer ${customerId} cart`, cart : getCustomerCart})
    }
    else{
        res.status(400).send({msg:`cannot get customer cart ${customerId}`})
    }
}))

router.put("/:cartId", asyncHandler(async(req, res)=>{

    const {cartId} = req.params
    const {qty} = req.body

    const updateItem = await Cart.findOneAndUpdate(
      { _id: cartId },
      {qty:qty},
      {
        new: true,
        runValidators: true,
      }
    );
    if(updateItem){
        res.status(200).json({ msg: `Item updated ${cartId}`, updateItem });
    }
    else{
        res.status(400).send({msg:`cannot update item  ${cartId}`})
    }
    
}))



module.exports = router