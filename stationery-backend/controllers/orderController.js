import orderModel from "../models/orderModel.js";

const CreateOrder = async (req, res) => {
  try {
    const order = new orderModel(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { CreateOrder };
