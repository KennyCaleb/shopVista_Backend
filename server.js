// importing modules
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors")

const error = require("./middleWare/errorMiddleWare");
const customersRouter = require("./Routes/userRouter");
const productsRouter = require("./Routes/productsRouter")
const cartRouter = require("./Routes/cartRouter")

//connecting to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });



// middlewares
app.use(express.json());
app.use(error.errorMiddleWareHandler);
app.use(cors())
app.use("/api/customers", customersRouter);
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

// creating server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
