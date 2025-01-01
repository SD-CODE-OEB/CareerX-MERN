import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRoutes.js";
import authorize from "./middlewares/auth.js";

dotenv.configDotenv();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

app.use("/api/static/images", express.static("static/images"));
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

mongoose
  .connect(process.env.MONGO_DB_LOCAL_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server Started on port 5000 and DB connected");
    });
  })
  .catch((error) => {
    console.log(error);
  });