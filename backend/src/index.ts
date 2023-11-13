import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { pizzaRouter } from "./routers/pizzaRouter";
import { seedRouter } from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";

dotenv.config();

const MONGODB_URI_REMOTE =
  process.env.MONGODB_URI_REMOTE || "mongodb://localhost/pizzashopdb";

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI_REMOTE)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    "Error connecting MongoDB";
  });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/pizzas", pizzaRouter);
app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

app.get("*", (req, res) => {
  res.send("404 Page Not Found");
});
