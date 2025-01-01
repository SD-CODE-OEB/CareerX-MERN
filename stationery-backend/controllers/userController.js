import bcrypt from "bcrypt";
import * as dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
dotenv.configDotenv();
const SECRET_KEY = process.env.SECRET_JWT_KEY;

const signup = async (req, res) => {
  const { name, pass, email, role } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist" });
    } else {
      const hashedPassword = await bcrypt.hash(pass, 10);
      const result = await userModel.create({
        name: name,
        pass: hashedPassword,
        email: email,
        role: role,
      });
      const token = jwt.sign(
        { email: result.email, role: result.role, id: result._id },
        SECRET_KEY
      );
      res.status(201).json({ user: result, token: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(pass, existingUser.pass);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        role: existingUser.role,
        id: existingUser._id,
      },
      SECRET_KEY
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const AdminSignin = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const existingUser = await userModel.findOne({
      email: email,
      role: "admin" || "Admin",
    });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(pass, existingUser.pass);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        role: existingUser.role,
        id: existingUser._id,
      },
      SECRET_KEY
    );

    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUserOrders = async (req, res) => {
  try {
    const id = req.params.uid;

    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const userOrders = await orderModel.find({ uid: id });

    const orderIds = userOrders.map(order => order._id);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { orders: orderIds },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

const updateUserCart = async (req, res) => {
  try {
    const id = req.params.uid;
    const { cartItems } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { cart: cartItems },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
const getUserCart = async (req, res) => {
  try {
    const id = req.params.uid;
    const user = await userModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const cartItems = user.cart;
    res.status(200).json(cartItems)
  } catch (err) {
    console.log(err)
  }
}

export { signup, signin, AdminSignin, showUsers, updateUserCart, updateUserOrders, getUserCart };
