import { Request, Response } from "express";
import OrderModel from "../models/order.models";

export const getOrders = async (req: Request, res: Response) => {
  console.log(req)
  try {
    const orders = await OrderModel.find({})
    res.status(200).json(orders)
  } catch (error) {
    res.status(404).json({ data: [] })
  }
}

export const createOrders = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const order = new OrderModel(data)
    const newOrder = await order.save()
    return res.status(201).json({
      status: "++++++++Created Order+++++",
      data: newOrder
    })
  } catch (err) {
    return res.status(500).json({ data: [] })
  }
}

export const checkingOrder = async (req: Request, res: Response) => {
  const data = req.body.phoneNumber;
  console.log("+++++++++++++++++++++++++++++", data)

  try {
    const order = await OrderModel.findOne({ 'orderOwner.email': data })
    if (!order) {
      return res.status(404).json({ status: "Захиалга олдсонгүй" })
    } else {
      return res.status(201).json({
        status: "Phone number",
        data: order
      })
    }
  } catch (err) {
    return res.status(500).json({ data: [] })
  }
}

export const deleteOrder = async (req: Request, res: Response) => {
  console.log(req.body)
  const id = req.body._id
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({
      status: "success",
      data: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete Order item' });
  }
}

export const putOrder = async (req: Request, res: Response) => {
  const body = req.body;
  console.log("==================", body);
  const findOrder = await OrderModel.findById(body.id);
  console.log(findOrder);
  res.json(findOrder);
}

export const updateOrder = async (req: Request, res: Response) => {
  const { _id, orderType,
        orderStatus} =
    req.body;

  const editOrder = await OrderModel.updateOne(
    { _id: _id },
    {
      $set: {
        orderType: orderType,
        orderStatus: orderStatus
      },
    }
  );
  console.log(editOrder);
  const result = await OrderModel.find({});
  res.json(result);

}
