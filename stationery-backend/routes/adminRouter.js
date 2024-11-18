import express from "express";
import { AdminSignin } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", AdminSignin);

export default adminRouter;
