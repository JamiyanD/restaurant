import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "@layout";

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

export async function getServerSideProps(req: any) {
  const { update } = req.params;
  return {
    props: {
      update,
    },
  };
}

export default function updateFoods(props: any): JSX.Element {
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

  const SHOW_FOOD_URL = `${process.env.BACKEND_URL}/foods/edit`;
  const UPDATE_URL = `${process.env.BACKEND_URL}/foods/update`;
  console.log("props", props);

  async function axiosProduct(): Promise<void> {
    const AXIOS_DATA = await axios.post(SHOW_FOOD_URL, { id: props.update });
    console.log("Hhi");
    if (AXIOS_DATA.status === 200) {
      setCurrentFood(AXIOS_DATA.data);
    }
  }
  useEffect(() => {
    axiosProduct();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(currentFood);

    const AXIOS_DATA = await axios.post(UPDATE_URL, currentFood);
    console.log(AXIOS_DATA);
    if (AXIOS_DATA.status === 200) {
      console.log("=========", AXIOS_DATA.data);

      setCurrentFood({
        ...currentFood,
        foodName: "",
        description: "",
        price: "",
        imgUrl: "",
        category: "",
      });
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
                <button className="btn btn-dark rounded-3" type="submit">
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
