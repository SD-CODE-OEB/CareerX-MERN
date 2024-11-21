import express from "express";
import {
  CreateOrder,
  deleteOrder,
  showOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/all", showOrders);
orderRouter.post("/add", CreateOrder);
orderRouter.delete("/cancel/:oid");
orderRouter.delete("/delete/:oid", deleteOrder);

export default orderRouter;
