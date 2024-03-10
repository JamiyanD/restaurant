import FoodModel from "../models/foods.models"
import { Request, Response } from "express";

export const getFoods = async (req: Request, res: Response) => {
  console.log(req)
  try {
    const foods = await FoodModel.find({})
    res.status(200).json(foods)
  } catch (error) {
    res.status(404).json({ data: [] })
  }
}

export const addFoods = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data)

  try {
    const newFood = new FoodModel(data);

    const food = await newFood.save();

    res.status(201).json({
      status: "success",
      data: food,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create food item' });
  }
}



export const deleteFoods = async (req: Request, res: Response) => {
  console.log(req.body)
  const id = req.body
  try {
    const deletedFood = await FoodModel.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    res.status(200).json({
      status: "success",
      data: deletedFood,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete food item' });
  }
}

export const putFood = async (req: Request, res: Response) => {
  const body = req.body;
  console.log("==================", body);
  const findOrder = await FoodModel.findById(body.id);
  console.log(findOrder);
  res.json(findOrder);
}

export const updateFood = async (req: Request, res: Response) => {
  const { _id,
    foodName,
    description,
    price,
    imgUrl,
    category } =
    req.body;

  const editOrder = await FoodModel.updateOne(
    { _id: _id },
    {
      $set: {
        foodName: foodName,
        description: description,
        price: price,
        imgUrl: imgUrl,
        category: category
      },
    }
  );
  console.log(editOrder);
  const result = await FoodModel.find({});
  res.json(result);

}
