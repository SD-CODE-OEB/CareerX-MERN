import e from "express";
import {
  addProduct,
  removeProduct,
  showProducts,
  updateProduct,
  upload,
} from "../controllers/productController.js";
const productRouter = e.Router();//
productRouter.get("/all", showProducts);
productRouter.post("/add", upload.single("file"), addProduct);
productRouter.patch("/update/:pid", updateProduct);
productRouter.delete("/delete/:pid", removeProduct);
export default productRouter;
