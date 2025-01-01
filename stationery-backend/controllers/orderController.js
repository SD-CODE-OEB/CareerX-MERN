import orderModel from "../models/orderModel.js";

const showOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const uid = req.params.id;
    if (uid) {
      const orders = await orderModel.find({ uid: uid });
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "User ID not provided" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const CreateOrder = async (req, res) => {
  try {
    const order = new orderModel(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.oid;
    if (id) {
      await orderModel.findByIdAndDelete(id);
      res.json({ message: "Order Deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { CreateOrder, showOrders, deleteOrder, userOrders };
