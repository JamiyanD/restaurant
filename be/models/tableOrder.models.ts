import mongoose, { Schema } from "mongoose";

// interface ITable {
//     table_number: string;
//     table_email: string;
//     table_date: string;
//     table_time: string;
//     table_people: string;
//     table_created_time: string;
//   }
const TableSchema = new mongoose.Schema({
  table_number: String,
  table_email: String,
  table_date: String,
  table_time: String,
  table_people: String,
  table_status: { type: String, default: "online" },
});

const TableModel = mongoose.model("table_order", TableSchema);

export default TableModel;
