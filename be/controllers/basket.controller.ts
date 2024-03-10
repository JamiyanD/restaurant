import { Request, Response } from "express";
import { BasketModel } from "../models/basket.models";

export const getOrders = async (req: Request, res: Response) => {
  console.log(req)
  try {
    const foods = await BasketModel.find({})
    res.status(200).json(foods)
  } catch (error) {
    res.status(404).json({ data: [] })
  }
}

export const addOrders = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data)
  const order = await BasketModel.findOne({ table: req.body.table });

  try {
    if (!order) {
      const order = new BasketModel(data)
      const newOrder = await order.save()
      return res.status(201).json({
        status: "++++++++Created Order+++++++",
        data: newOrder
      })
    } else {
      const saveFood = await BasketModel.findOneAndUpdate({ table: req.body.table }, { $push: { basketItem: { _id: data.basketItem[0]._id, foodName: data.basketItem[0].foodName, orderQuantity: data.basketItem[0].orderQuantity, orderFeedback: data.basketItem[0].orderFeedback, totalPrice: data.basketItem[0].totalPrice } } });

      await saveFood?.save();

      return res.status(201).json({
        status: "success",
        data: saveFood,
      })
    }
  } catch (error) {
    return res.status(500).json({ error: 'Unable to create order' });
  }
}

export const deleteBasketItem = async (req: Request, res: Response) => {
  const data = req.body
  console.log("BOODYYY IIIDDD",data)

  const order = await BasketModel.find({_id:data.orderId})
  const basketItems = order[0].basketItem
  
  try {
    const updateBasketItem = basketItems.filter(item => item._id.toString() !== data.id);
    console.log("====================================", updateBasketItem)
    console.log(data.orderId)
    const updatedBasketItem = await BasketModel.findByIdAndUpdate({ _id : data.orderId}, {basketItem: updateBasketItem})
    console.log("++++++++++++++++++++++++++++++++++", updatedBasketItem)
    return res.status(200).json(updatedBasketItem)
  }
  catch (err) {
    return res.status(500).json(err)
  }

}

export const deleteOrders = async (req: Request, res: Response) => {
  const id = req.body
  try {
    const deletedOrder = await BasketModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({
      status: "success",
      data: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete order' });
  }
}