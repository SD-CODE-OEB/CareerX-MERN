import mongoose from "mongoose";
import db, { Schema } from "mongoose";

const orderSchema = db.Schema({
  uid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: {
    type: [{
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true }
    }]
  },
  orderedDate: { type: Date, default: Date.now },
  orderTotal: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

export default db.model("Order", orderSchema);
