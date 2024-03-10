import Header from "../components/header";
import { ModalDetail, ModalOrder } from "@/components/Modals";
import { TablesContext } from "@/context/TablesContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

export default function MenuPage(): JSX.Element {
  const URL = `${process.env.BACKEND_URL}/foods/list`;
  const URL_ORDER_LIST = `${process.env.BACKEND_URL}/basket/list`;
  const URL_BASKETITEM_DELETE = `${process.env.BACKEND_URL}/basket/deleteBasketItem`;

  const [openOrder, setOpenOrder] = useState(false);
  const [foods, setFoods] = useState([]);
  const [filterFoods, setFilterFoods] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [filteredFood, setFilteredFood] = useState([]);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { tableId }: any = useContext(TablesContext);

  function handleOpenDetail(foodId: any) {
    console.log("food id", foodId);
    const filteredFoods = foods.filter((food: any) => food._id === foodId);
    console.log("filtered id", filteredFoods);
    setOpenDetail(true);
    setFilteredFood(filteredFoods);
  }

  async function fetchOrders(): Promise<void> {
    const FETCHED_DATA = await fetch(URL_ORDER_LIST);
    const FETCHED_JSON = await FETCHED_DATA.json();
    const filteredOrders = FETCHED_JSON.filter(
      (order: any) => order.table === tableId
    );
    console.log("JOSNNNN", filteredOrders);
    if (filteredOrders.length !== 0) {
      setOrders(filteredOrders[0].basketItem);
      setOrderId(filteredOrders[0]._id);
      console.log("ORDERS", orders);
    }
  }

  async function handleDeleteItem(id: any, orderId: any) {
    console.log("ID+++++++++++++++++++", id);
    const deleteId = {
      id: id,
      orderId: orderId,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteId),
    };
    const FETCHED_DATA = await fetch(URL_BASKETITEM_DELETE, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    console.log(FETCHED_JSON);
    fetchOrders();
  }

  useEffect(() => {
    handleCategory("1-р хоол");
    fetchOrders();
  }, [open, openDetail]);

  function handleOpenOrder() {
    setOpenOrder(true);
  }

  async function handleCategory(category: any) {
    const FETCHED_DATA = await fetch(URL);
    const FETCHED_JSON = await FETCHED_DATA.json();
    setFoods(FETCHED_JSON);
    setOpen(true);
    console.log(open);
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
          className="w-full md:w-3/4 h-screen flex flex-col justify-evenly items-center p-4"
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
        </div>

        <div
          className="invisible md:visible md:w-1/4 h-0 md:h-screen flex flex-col items-center justify-between"
          style={{ backgroundColor: "#000000e9" }}
        >
          <div className=" w-10/12 mt-8 h-16 border-b border-[gray]">
            <h1 className="text-center text-4xl mb-8 text-[#E17148]">
              Захиалга
            </h1>
          </div>
          <div className="overflow-auto h-full w-11/12">
            {orders.map((order: any, index: any) => (
              <div
                key={index}
                className="flex justify-between items-center h-1/6 border-b border-[gray] w-full"
              >
                <div className="flex flex-col justify-center items-center w-2/5">
                  <h1 className="text-center text-white">{order.foodName}</h1>
                  <p className="text-[gray]">{order.orderFeedback}</p>
                </div>
                <h1 className="text-center text-md text-[gray] w-1/5">
                  {order.orderQuantity}
                </h1>
                <h1 className="text-center text-[#E17148] text-md w-1/5">
                  {order.totalPrice}
                </h1>
                <button
                  onClick={() => handleDeleteItem(order._id, orderId)}
                  className="bg-[#E17148] rounded-full w-1/5"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div className=" w-10/12 my-8 h-16 border-t border-[gray]">
            <Link href="./checkout">
              <button className=" bg-[#E17148] hover:bg-[#b35a39] w-full mt-4 h-16">
                Захиалах
              </button>
            </Link>
          </div>
        </div>
        <ModalDetail
          filteredFood={filteredFood}
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
        />
        <ModalOrder
          orders={orders}
          openOrder={openOrder}
          setOpenOrder={setOpenOrder}
        />
      </div>
      <div className="fixed md:hidden w-screen bottom-1 flex justify-center">
        <button
          className="text-white bg-[#E17148] hover:bg-[#b35a39] w-11/12 h-10"
          onClick={handleOpenOrder}
        >
          Захиалах
        </button>
      </div>
    </div>
  );
}
