import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

//routes
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponsRoutes from "./routes/coupon route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import {connectDB} from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({limit:"10mb"})); //allows you to parse the body of the request
app.use(cookieParser());

//authentication
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/coupons",couponsRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/analytics",analyticsRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"frontend/dist"))); //serve the frontend build files
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
  });
}

app.listen (PORT, () => {
  console.log("Server is running on http://localhost:"+PORT);
  connectDB();
});

//i6EZ6zJPeZmU66zd