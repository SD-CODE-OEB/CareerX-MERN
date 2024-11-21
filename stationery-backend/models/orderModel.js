import db, { Schema } from "mongoose";

const orderSchema = db.Schema({
  uid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  orderedDate: { type: Date, default: Date.now },
  orderTotal: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

export default db.model("Order", orderSchema);
