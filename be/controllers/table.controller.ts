import { Request, Response } from "express";
import TableModel from "../models/table.models";

export const getTables = async (req: Request, res: Response) => {
  console.log(req)
  try {
    const tables = await TableModel.find({})
    res.status(200).json(tables)
  } catch (error) {
    res.status(404).json({ data: [] })
  }
}

export const getTable = async ( req: Request, res: Response ) => {
    const tableNumber = req.body.tableNumber;
    console.log(tableNumber)
    
    try {
        const table = await TableModel.find({tableNumber: tableNumber})
        res.status(200).json(table[0]._id)
    } catch (err) {
        res.status(404).json({ data: []})
    }
}

export const getTableNumber = async ( req: Request, res: Response ) => {
  const {id}:any = req.params;
  // console.log("=====",id)

  try {
      const table = await TableModel.findById(id)
      res.status(200).json(table)
  } catch (err) {
      res.status(404).json(err)
  }
}

export const addTables = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const newTable = new TableModel(data);

    const table = await newTable.save();

    res.status(201).json({
      status: "success",
      data: table,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create order' });
  }
}

export const deleteTables = async (req: Request, res: Response) => {
  const id = req.body
  try {
    const deletedTable = await TableModel.findByIdAndDelete(id);

    if (!deletedTable) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json({
      status: "success",
      data: deletedTable,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete food item' });
  }
}
