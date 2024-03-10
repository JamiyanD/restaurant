import { Router } from "express";
import {
  addStaff,
  deleteStaff,
  getStaff,
  loginStaff,
} from "../controllers/staff.controll";

const staffRouter = Router();

staffRouter.get("/", getStaff);
staffRouter.post("/new", addStaff);
staffRouter.post("/login", loginStaff);
staffRouter.delete("/", deleteStaff);

export default staffRouter;
