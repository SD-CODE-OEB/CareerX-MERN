import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRouter.js";
import adminRouter from "./routes/adminRouter.js";
import productRouter from "./routes/productRoutes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("static"));
app.use("/static/images", express.static("static/images"));
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/orders", orderRouter);
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommdb")
  .then(() => {
    app.listen(8080, () => {
      console.log("Server Started on port 8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });
