import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    cart: {
      type: [
        {
          item: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, required: true, default: 0 },
        }
      ],
      default: []
    },
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Order",
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
