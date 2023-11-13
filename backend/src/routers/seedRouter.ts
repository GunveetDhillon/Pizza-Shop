import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { PizzaModel } from "../models/pizzaModel";
import { typePizzas, typeUsers } from "../data";
import { UserModel } from "../models/userModel";

export const seedRouter = express.Router();

seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await PizzaModel.deleteMany({});
    const createdPizzas = await PizzaModel.insertMany(typePizzas);

    await UserModel.deleteMany({});
    const createdUsers = await UserModel.insertMany(typeUsers);

    res.json({ createdPizzas, createdUsers });
  })
);
