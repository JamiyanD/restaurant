import { Router } from "express";
import { addFoods, deleteFoods, getFoods, putFood, updateFood } from "../controllers/foods.controller";

const foodsRouter = Router()

foodsRouter.get("/list", getFoods);
foodsRouter.post("/addFoods", addFoods);
foodsRouter.delete("/deleteFoods", deleteFoods);
foodsRouter.post("/edit", putFood);
foodsRouter.post("/update", updateFood);

export default foodsRouter