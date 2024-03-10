import mongoose, { Schema } from "mongoose";

interface IOrder {
    orderItems: IOrderItem[];
    table:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    }
    ;
    orderOwner: {
        firstName: string,
        lastName: string,
        phone: string,
        email: string
    };
    paymentType: string;
    orderType?: string;
    orderNote: string;
    orderStatus?: string;
    totalPrice?: number;
    created_at: Date;
}

export interface IOrderItem {
    products?:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    }
}

const OrderItemSchema: Schema = new Schema({
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },
    foodName: { type: String},
    orderFeedback: { type: String},
    orderQuantity: { type: Number},
    totalPrice: { type: Number},
});

const OrderSchema: Schema = new Schema({
    orderItems: [OrderItemSchema],
    table: { type: String},
    orderOwner: {
        firstName: { type: String},
        lastName: { type: String},
        phone: { type: String},
        email: { type: String}
    },
    paymentType: { type: String},
    orderType: { type: String},
    orderNote: { type: String },
    orderStatus: { type: String, default: 'Хийгдэж байна'},
    totalPrice: { type: Number},
    created_at: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;