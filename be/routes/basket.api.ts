import { Router } from "express";
import { addOrders, deleteBasketItem, deleteOrders, getOrders } from "../controllers/basket.controller";

const basketRouter = Router()

basketRouter.get("/list", getOrders);
basketRouter.put("/addOrder", addOrders);
basketRouter.delete("/deleteOrder", deleteOrders)
basketRouter.put("/deleteBasketItem", deleteBasketItem)

export default basketRouter