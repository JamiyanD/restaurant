import Header from "@/components/header";
import { ModalMenuDetail } from "@/components/Modals";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CheckingMenu() {
  const URL = `${process.env.BACKEND_URL}/foods/list`;

  const [foods, setFoods] = useState([]);
  const [filterFoods, setFilterFoods] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [filteredFood, setFilteredFood] = useState([]);
  const [open, setOpen] = useState(false);

  function handleOpenDetail(foodId: any) {
    console.log("food id", foodId);
    const filteredFoods = foods.filter((food: any) => food._id === foodId);
    console.log("filtered id", filteredFoods);
    setOpenDetail(true);
    setFilteredFood(filteredFoods);
  }

  useEffect(() => {
    handleCategory("1-р хоол");
  }, [open]);

  async function handleCategory(category: any) {
    const FETCHED_DATA = await fetch(URL);
    const FETCHED_JSON = await FETCHED_DATA.json();
    setFoods(FETCHED_JSON);
    setOpen(true);
    const filteredFoods = foods.filter(
      (food: any) => food.category === category
    );
    setFilterFoods(filteredFoods);
  }

  return (
    <div className="flex-col">
      <Header />
      <div
        className="flex justify-center items-center"
        style={{
          backgroundImage:
            "url(" +
            "https://static.wixstatic.com/media/c837a6_3150cf2587214221978d85eeac6f0dd5~mv2.jpg/v1/fill/w_1960,h_430,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_3150cf2587214221978d85eeac6f0dd5~mv2.jpg" +
            ")",
          height: "30vh",
          width: "100vw",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-4xl md:text-6xl text-black">MENU</h1>
      </div>
      <div className="md:flex w-screen">
        <div
          className="w-full h-screen flex flex-col justify-evenly items-center p-4"
          style={{ backgroundColor: "black" }}
        >
          <div className="text-sm md:text-lg lg:text-xl flex">
            {foods
              .map((item: any) => item.category)
              .filter(
                (item, index) =>
                  foods.map((item: any) => item.category).indexOf(item) ===
                  index
              )
              .map((category, index) => (
                <div
                  key={index}
                  className="flex items-center border-b-2 border-[#E17148] hover:border-[#8c4b44] mx-2.5"
                >
                  <a
                    onClick={() => handleCategory(category)}
                    className="text-center text-white text-sm"
                    href="#"
                  >
                    {category}
                  </a>
                </div>
              ))}
          </div>
          <div className="overflow-auto">
            <div className="grid md:grid-cols-2">
              {filterFoods.map((food: any, index: any) => (
                <button
                  key={index}
                  className="flex h-36 md:m-3 justify-between items-center border-b md:border border-[#454545] hover:border-[white]"
                  onClick={() => handleOpenDetail(food._id)}
                >
                  <img
                    className="h-20 w-20 md:h-24 md:w-24 xl:w-36 xl:h-full object-cover"
                    src={food.imgUrl}
                    alt="food"
                  />
                  <div className="mx-2.5 flex flex-col items-end">
                    <h1 className="text-white text-md lg:text-md font-bold">
                      {food.foodName}
                    </h1>
                    <p className="text-white text-xs lg:text-md">
                      {food.description.substring(0, 60)} . . .
                    </p>
                    <h1 className="text-md md:text-lg lg:text-lg mx-2.5 m-auto text-[#E17148]">
                      ₮{food.price}
                    </h1>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <Link href="./table">
            <button className="bg-[#E17148] mt-7 mb-4 md:my-10 w-64 md:h-12">
              Хоол захиалах
            </button>
          </Link>
        </div>
      </div>
      <ModalMenuDetail
        filteredFood={filteredFood}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />
    </div>
  );
}
