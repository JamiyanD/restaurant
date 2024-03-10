import mongoose, { Schema } from "mongoose";

interface IFoods {
    foodName: string;
    description?: string;
    price: number;
    imgUrl?: string;
    category: string;
    orderQuantity: number;
    orderFeedback?: string;
    totalPrice: number
}
const FoodSchema: Schema = new Schema({
    foodName: { type: String },
    description: { type: String },
    price: { type: Number },
    imgUrl: { type: String },
    category: { type: String },
    orderQuantity: { type: Number },
    orderFeedback: { type: String },
    totalPrice: { type: Number }
})

const FoodModel = mongoose.model<IFoods>("Food", FoodSchema)

export default FoodModel