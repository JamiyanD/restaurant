import * as mongoose from "mongoose";

export interface User {
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const UserModel = mongoose.model<User>("users", UserSchema);

export default UserModel;
