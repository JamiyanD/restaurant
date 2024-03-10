import { Router } from "express";
import { checkingOrder, createOrders, deleteOrder, getOrders, putOrder, updateOrder } from "../controllers/order.controller";

const orderRouter = Router()

orderRouter.get("/list", getOrders);
orderRouter.post("/createOrder", createOrders)
orderRouter.post("/checkingOrder", checkingOrder)
orderRouter.delete("/deleteOrder", deleteOrder)
orderRouter.post("/edit", putOrder);
orderRouter.post("/update", updateOrder);

export default orderRouter