import mongoose, { Schema } from "mongoose";

interface ITable {
    tableNumber: number;
}
const TableSchema: Schema = new Schema({
    tableNumber: { type: Number, required: true }
})

const TableModel = mongoose.model<ITable>("Table", TableSchema)

export default TableModel