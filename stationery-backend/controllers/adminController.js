import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "ilovefriedrice";

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

export { AdminSignin };
