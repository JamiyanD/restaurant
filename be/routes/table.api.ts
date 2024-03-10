import { Router } from "express";
import { addTables, deleteTables, getTable, getTableNumber, getTables } from "../controllers/table.controller";

const tablesRouter = Router()

tablesRouter.get("/list", getTables);
tablesRouter.post("/table", getTable);
tablesRouter.get("/tableNumber/:id", getTableNumber)
tablesRouter.post("/addTable", addTables);
tablesRouter.delete("/deleteTable", deleteTables)

export default tablesRouter