import express from "express";
import {
  addProduct,
  removeProduct,
  showProducts,
  updateProduct,
} from "../controllers/productController.js";
import { upload } from "../middlewares/upload.js";

const productRouter = express.Router();

productRouter.get("/all", showProducts);
productRouter.post("/add", upload.single('file'), addProduct);
productRouter.patch("/update/:pid", updateProduct);
productRouter.delete("/delete/:pid", removeProduct);
productRouter.post('/addToCart/:pid',)
export default productRouter;
