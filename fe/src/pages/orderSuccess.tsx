import { OrderContext } from "@/context/OrderCheckContext";
import Link from "next/link";
import React, { useContext } from "react";

export default function OrderSuccessPage() {
    const {order}: any = useContext(OrderContext)
    console.log("sdasdasdadsadas",order)
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-black">
            <svg className="text-[#E17148] w-36 h-36" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            <h1 className="text-white text-4xl my-12 text-center md:text-8xl md:my-16">Амжилттай захиалагдлаа.</h1>
            <Link href="./"><button className="border-y border-[#E17148] hover:bg-[#E17148] text-white w-48 h-10">BACK to HOME</button></Link>
        </div>
    )
}