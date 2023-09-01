const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Products = require("../models/productModel");

// add products
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, price, shippingFee, imgUrls, category } = req.body;

    console.log(req.body);

    const newProduct = await Products.create({
      name,
      price,
      shippingFee,
      imgUrls,
      category,
    });
    if (newProduct) {
      res.status(200).json({
        msg: "Product added.",
        product: { name, price, shippingFee, imgUrls, category },
      });
    } else {
      res.send.json({ msg: "product not created" });
    }
  })
);

// get products
router.get("/", async (req, res) => {
  const getProducts = await Products.find();

  if (getProducts) {
    res.status(200).json({ msg: "All Products", products: getProducts });
  } else {
    res.status(400).json({ msg: "Cannot fetch products." });
  }
});

// get product
router.get("/:id", async (req, res) => {

  const id = req.params.id;

  const getProduct = await Products.findOne({ _id: id });

  if(getProduct){
      res.status(200).json({msg : `product ${id}`, product : getProduct })
  }
  
  else{
      res.status(400).send({msg :`cannot get product - ${id}`})
  }
});


module.exports = router;
