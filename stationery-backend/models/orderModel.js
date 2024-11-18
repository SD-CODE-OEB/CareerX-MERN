import db from "mongoose";

const orderSchema = db.Schema({
  uid: { type: String, required: true },
  orderDate: { type: Date, required: true },
  orderStatus: { type: String, required: true },
  orderItems: { type: Array, required: true },
  orderTotal: { type: Number, required: true },
});

export default db.model("Order", orderSchema);
