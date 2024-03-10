import { OrderContext } from "@/context/OrderCheckContext";
import Link from "next/link";
import React, { useContext } from "react";

export default function CheckingOrder() {
    const { handleCheckingOrder, fetchCheckingOrder }: any = useContext(OrderContext)

    return (
        <div>
            <div className="">
                <div className="flex flex-col justify-center items-center" style={{
                    backgroundImage:
                        "url(" +
                        "https://preview.colorlib.com/theme/pato/images/bg-title-page-01.jpg" +
                        ")",
                    height: "100vh",
                    width: "100vw",
                    backgroundRepeat: "repeat",
                    backgroundSize: "cover"
                }}>
                    <h1 className="text-center text-4xl md:text-6xl text-white">Имейл хаягаа оруулна уу.</h1>
                    <div className="md:flex w-1/2 md:w-1/4 mt-16">
                        <input onChange={handleCheckingOrder} type="string" className="w-full text-lg md:text-2xl" />
                        <Link href="./checkingOrderData"><button onClick={fetchCheckingOrder} className="flex w-full justify-center items-center px-3 bg-black border-2 border-white text-white">Захиалга шалгах</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}