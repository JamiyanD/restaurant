import { Router } from "express";
import {addTableOrders, getTableOrders,deleteTableOrders,
   updateTableOrders , putTableOrders, filterTableOrders } from "../controllers/tableOrder.controller";
const tableRouter = Router();

tableRouter.get("/", getTableOrders);
tableRouter.post("/", addTableOrders);
tableRouter.delete("/", deleteTableOrders);
tableRouter.post("/edit", putTableOrders);
tableRouter.post("/update", updateTableOrders);
tableRouter.post("/filter", filterTableOrders);

// tableRouter.get("/byId/:id", getMoviesById);

// tableRouter.post("/detail", getMoviesDetail);
// tableRouter.get("/search", searchMovies);

export default tableRouter;
