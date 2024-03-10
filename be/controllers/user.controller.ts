import { Request, Response } from "express";
import bcrypt from "bcrypt";
import TableModel from "../models/tableOrder.models";
import UserModel from "../models/user.model";
import { filterTableOrders } from "./tableOrder.controller";

export const getUser = async (req: Request, res: Response) => {
  try {
    const Users = await UserModel.find({}).populate("_id");
    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ status: "error", data: [] });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  if (body) {
    const oldUser = await UserModel.findOne({ email: body.email });
    console.log(oldUser);
    if (oldUser) {
      return res.json({
        status: 400,
        message: "Уучлаарай хэрэглэгч бүртгэлтэй байна.", 
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    console.log("hha");
    const insertUser = new UserModel(body);
    console.log(insertUser);
    const result = await insertUser.save();
    console.log("hhi");
    res.json({
      status: 200,
      messege: "Amjilttai burtgegdle",
      data: result,
    });
    console.log(body);
  } else {
    return res.status(400).json({
      status: "error",
      message: "Talbariig bugulnu u",
    });
  }
};

export const checkUser = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  if (body) {
    const findOrderedTable = await TableModel.findOne({ table_email: body.email });
    if(findOrderedTable){
      return res.json({
        status: 200,
        data:findOrderedTable
      });
    }else {
      const findOrderedTable = await TableModel.findOne({ table_email: body.email });
      return res.json({
        status: 400,
        message: "Уучлаарай бүртгэлгүй хаяг байна.",
      });
    }
   
  } 
};

export const deleteUser = async (req: Request, res: Response) => {
  const _id = req.body;
  try {
    const deletedOrder = await UserModel.findByIdAndDelete(_id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "User not found" });
    }
    const result = await UserModel.find({});
    res.status(200).json({
      status: "successfully deleted",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete food item" });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const body = req.body;
  console.log("sda", body.id);
  const findUser = await UserModel.findById(body.id);
  console.log(findUser);
  res.json(findUser);
};

export const updateUser = async (req: Request, res: Response) => {
  const { _id,email, password } = req.body;
  const editOrder = await UserModel.updateOne(
    { _id: _id },
    {
      $set: {
        email: email,
        password: password
      },
    }
  );
  console.log(editOrder);
  const result = await UserModel.find({});
  res.json(result);
};

export const loginUser = async (req: Request, res: Response) => {};
