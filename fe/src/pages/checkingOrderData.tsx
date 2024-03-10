import { OrderContext } from "@/context/OrderCheckContext";
import Link from "next/link";
import React, { useContext } from "react";

export default function CheckingOrderData() {
  const { order }: any = useContext(OrderContext);
  const foods = order.orderItems;
  return (
    <div className="h-screen bg-black flex flex-col justify-around items-center">
      <div className="flex flex-col items-center justify-center">
        <svg
          className="text-[#E17148] w-24 h-24 md:w-36 mf:h-36"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z" />
        </svg>
        <h1 className="text-white text-4xl my-12 text-center md:text-8xl md:my-16">
          Захиалгын мэдээлэл
        </h1>
      </div>
      <div className="h-1/3 flex flex-col justify-around">
        {foods.map((food: any, index: any) => (
          <div key={index} className="flex overflow-auto">
            <h1 className="text-white w-2/4 text-center">{food.foodName}</h1>
            <h1 className="text-white w-1/4 text-center">
              x{food.orderQuantity}
            </h1>
            <h1 className="text-white w-1/4 text-center">{food.totalPrice}</h1>
          </div>
        ))}
        <div className="flex items-center justify-center">
          <h1 className="text-white text-center w-1/2 flex">Таны захиалга: </h1>
          <h1 className="text-[#E17148] text-center flex w-1/2">
            {" "}
            {order.orderStatus}
          </h1>
        </div>
      </div>
      <Link href="./">
        <button className="border-y border-[#E17148] hover:bg-[#E17148] text-white w-48 h-10">
          BACK to HOME
        </button>
      </Link>
    </div>
  );
}
