import StaffModel from "../models/staff.models";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getStaff = async (req: Request, res: Response) => {
  try {
    const Staffs = await StaffModel.find({}).populate("_id");
    res.status(200).json(Staffs);
  } catch {
    res.status(404).json({ status: "error", data: [] });
  }
};

export const addStaff = async (req: Request, res: Response) => {
  const body = req.body;
  if (body) {
    const oldStaff = await StaffModel.findOne({
      staffNumber: body.staffNumber,
    });
    if (oldStaff) {
      return res.status(400).json({
        success: false,
        status: "Ajiltan burtgeltei baina",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const insertStaff = new StaffModel(body);
    const result = await insertStaff.save();
    res.json({
      status: "success",
      messege: "Amjilttai burtgegdlee",
      data: result,
    });
    console.log(body);
  } else {
    return res.status(400).json({
      success: false,
      status: "Talbariig buren bugulnu uu",
    });
  }
};

export const loginStaff = async (req: Request, res: Response) => {
  try {
    const { staffNumber, password } = req.body;
    if (!(staffNumber && password)) {
      res.status(400).json({
        success: false,
        status: "Utguudaa buren oruulna uu",
        staffNumber: staffNumber,
        password: password,
      });
      return;
    }
    const user = await StaffModel.findOne({ staffNumber });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { staff_id: user._id, staffNumber },
        "MyPrivateKey",
        { expiresIn: "2h" }
      );
      res.status(200).json({
        success: true,
        status: "Amjilttai nevterlee",
        data: user,
        token: token,
      });
      return;
    }
    res.status(400).json({
      success: false,
      status: "Nuuts ug ner hoorondoo taarahgui baina",
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

export const deleteStaff = async (req: Request, res: Response) => {
  const _id = req.body;
  console.log(_id);
  try {
    const deletedStaff = await StaffModel.findByIdAndDelete(_id);
    res.json({
      status: "success",
      messege: "successfully deleted",
      data: deletedStaff,
    });

    if (!deletedStaff) {
      return res.status(404).json({
        error: "staff not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "unable to delete staff" });
  }
};
