import * as mongoose from "mongoose";

export const StaffSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
  },
  staffNumber: {
    type: String,
  },
});

export interface Staff {
  _id: string;
  username: string;
  role: string;
  password: string;
  date: string;
  staffNumber: string;
}

const StaffModel = mongoose.model<Staff>("staffs", StaffSchema);

export default StaffModel;
