import express from "express";
import asyncHandler from "express-async-handler";
import { PizzaModel } from "../models/pizzaModel";

export const pizzaRouter = express.Router();

// /api/pizzas
pizzaRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const pizzas = await PizzaModel.find();
    res.json(pizzas);
  })
);

// /api/slug/veg
pizzaRouter.get(
  "/slug/:slug",
  asyncHandler(async (req, res) => {
    const pizza = await PizzaModel.findOne({ slug: req.params.slug });
    if (pizza) {
      res.json(pizza);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  })
);
