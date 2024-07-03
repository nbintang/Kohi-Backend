import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.router.js";
import productRoutes from "./routes/product.router.js";
import orderRoutes from "./routes/order.router.js";
import orderItemRoutes from "./routes/order-item.router.js";
import authRoutes from "./routes/auth.router.js";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
const { JsonWebTokenError } = jsonwebtoken;

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (_, res) => {
res.send('<h3> go to api/{endpoint} to see the result</h3>');
});

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", orderItemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
