import mongoose, { Schema } from "mongoose";

interface IBasketItem {
    products?:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    };
    _id: string;
}

interface IBaskets {
    basketItem: [IBasketItem]
    totalPrice?: number;
    table:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    }
    ;
    orderType?: string;
    orderStatus?: string;
    orderDate: Date
}

const BasketItemSchema: Schema = new Schema({
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },
    foodName: { type: String },
    orderQuantity: { type: Number },
    orderFeedback: { type: String },
    totalPrice: { type: Number }
})

const BasketItemModel = mongoose.model<IBasketItem>("BasketItem", BasketItemSchema)

const BasketSchema: Schema = new Schema({
    basketItem: [BasketItemSchema],
    totalPrice: { type: Number },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    }
    ,
    orderType: { type: String },
    orderStatus: { type: String },
    orderDate: { type: Date, default: Date.now }
})

const BasketModel = mongoose.model<IBaskets>("Basket", BasketSchema)

export { BasketModel, BasketItemModel }