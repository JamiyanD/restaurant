import { Router } from "express";

import { addUser, deleteUser, getUser, putUser,updateUser,checkUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.post("/", addUser);
userRouter.post("/check", checkUser);
userRouter.put("/update", putUser);
userRouter.post("/update", updateUser);
userRouter.delete("/", deleteUser);

export default userRouter;
