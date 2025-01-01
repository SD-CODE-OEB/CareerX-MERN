import path from "path";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  const { name, price } = req.body;
  const file = req.file;
  try {
    const createProduct = await productModel.create({
      name: name,
      price: price,
      url: `/static/images/${name}${path.extname(file.originalname)}`,
    });
    res.status(201).json(createProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.pid;
  const { name, price } = req.body;
  const file = req.file ? `/static/images/${name}${path.extname(req.file.originalname)}` : req.body.url;
  try {
    const product = await productModel.findByIdAndUpdate(
      id,
      { name: name, price: price, url: `/static/images/${name}${path.extname(file.originalname)}` },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showProducts = async (req, res) => {
  try {
    const items = await productModel.find();
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const removeProduct = async (req, res) => {
  const id = req.params.pid;
  try {
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { addProduct, showProducts, updateProduct, removeProduct };
