import express from "express";
import { CreateOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/all");
orderRouter.post("/add", CreateOrder);
orderRouter.patch("/update/:oid");
orderRouter.delete("/delete/:oid");

export default orderRouter;
