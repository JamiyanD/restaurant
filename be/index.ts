import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import foodsRouter from "./routes/foods.api";
import basketRouter from "./routes/basket.api";
import userRouter from "./routes/user.api";
import tableRouter from "./routes/tableOrder.api";
import tablesRouter from "./routes/table.api";
import staffRouter from "./routes/staff.api";
import orderRouter from "./routes/order.api";
import { verify } from "crypto";

dotenv.config()



const PORT = process.env.PORT;

const MONGO_CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING ||
  "mongodb+srv://script-dudes:scriptdudes123@script-dudes-project.0kbsjt3.mongodb.net/restaurant";
const app: Express = express();

app.use(cors())
app.use(express.json());
app.use("/foods", foodsRouter)
app.use("/basket", basketRouter)
app.use("/tables", tablesRouter)
app.use("/table", tableRouter);
app.use("/users", userRouter);
app.use("/staffs", staffRouter);
app.use("/order", orderRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Projecdsdst</h1>");
});

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => console.log("Database connected succesfully"))
    .catch((err) => console.error(err));
  console.log(`Server is running on http://localhost:${PORT}`);
});
