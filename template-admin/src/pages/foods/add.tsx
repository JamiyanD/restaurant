import * as React from "react";
import { AdminLayout } from "@layout";
import { useState } from "react";
import Router, { useRouter } from "next/router";

interface IFood {
  _id: string;
  foodName: string;
  description: string;
  price: string;
  imgUrl: string;
  category: string;
  orderQuantity: string;
  orderFeedback?: string;
  totalPrice: string;
}

export default function TableAdd() {
  const ADD_FOOD_URL = `${process.env.BACKEND_URL}/foods/addFoods`;
  const router = useRouter();

  const [currentFood, setCurrentFood] = useState<IFood>({
    _id: "",
    foodName: "",
    description: "",
    price: "",
    imgUrl: "",
    category: "",
    orderQuantity: "",
    orderFeedback: "",
    totalPrice: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("ene uu", currentFood);

    const FoodData = {
      foodName: currentFood.foodName,
      description: currentFood.description,
      price: currentFood.price,
      imgUrl: currentFood.imgUrl,
      category: currentFood.category,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FoodData),
    };
    const FETCHED_DATA = await fetch(ADD_FOOD_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    if (FETCHED_JSON.status === "success") {
      router.push("/foods/foodList");
    }
  }

  function handleFoodName(e: any) {
    setCurrentFood({
      ...currentFood,
      foodName: e.target.value,
    });
  }
  function handleDescription(e: any) {
    console.log(e.target.value);
    setCurrentFood({
      ...currentFood,
      description: e.target.value,
    });
  }
  function handlePrice(e: any) {
    console.log(e.target.value);
    setCurrentFood({
      ...currentFood,
      price: e.target.value,
    });
  }
  function handleImgUrl(e: any) {
    console.log(e.target.value);
    setCurrentFood({
      ...currentFood,
      imgUrl: e.target.value,
    });
  }
  function handleCategory(e: any) {
    console.log(e.target.value);
    setCurrentFood({
      ...currentFood,
      category: e.target.value,
    });
  }

  return (
    <div>
      <AdminLayout>
        <div className="rounded-5 p-3">
          <div className="p-0">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <div className="p-0">
                  <p>User information</p>

                  <p>Food Name</p>
                  <input
                    type=""
                    name="foodName"
                    className="form-control shadow-none border-secondary mb-4"
                    placeholder="Food Name"
                    onChange={handleFoodName}
                    value={currentFood.foodName}
                  />

                  <p>Description</p>
                  <input
                    type=""
                    name="description"
                    className="form-control shadow-none border-secondary rounded-3 mb-4"
                    placeholder="Description"
                    onChange={handleDescription}
                    value={currentFood.description}
                  />

                  <p>Price</p>
                  <input
                    type=""
                    name="price"
                    className="form-control shadow-none border-secondary rounded-3 mb-4"
                    placeholder="Description"
                    onChange={handlePrice}
                    value={currentFood.price}
                  />

                  <p>Image URL</p>
                  <input
                    type=""
                    name="imgUrl"
                    className="form-control shadow-none border-secondary rounded-3 mb-4"
                    placeholder="Image URL"
                    onChange={handleImgUrl}
                    value={currentFood.imgUrl}
                  />

                  <p>Category</p>
                  <select
                    name="category"
                    className="form-control shadow-none border-secondary rounded-3 mb-4"
                    placeholder="Category"
                    onChange={handleCategory}
                  >
                    <option value="">-</option>
                    <option value="1-р хоол">1-р хоол</option>
                    <option value="2-р хоол">2-р хоол</option>
                    <option value="Амттан">Амттан</option>
                    <option value="Ус, ундаа">Ус, ундаа</option>
                    <option value="Хатуу ундаа">Хатуу ундаа</option>
                  </select>
                </div>
              </div>
              <div className="">
                <button type="submit" className="btn btn-dark rounded-3 me-3">
                  Save Changes
                </button>
                <button type="submit" className="btn btn-dark rounded-3">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
