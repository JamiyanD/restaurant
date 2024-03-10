import { TablesContext } from "@/context/TablesContext";
import Link from "next/link";
import React, { useContext } from "react";

export default function ChoosingTable(): JSX.Element {
    const { updategetTableId, handleTable }: any = useContext(TablesContext);

    return (
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
                <h1 className="text-center text-4xl md:text-6xl text-white">Ширээний дугаараа оруулна уу.</h1>
                <div className="flex md:w-48 h-32 mt-16">
                    <input onChange={updategetTableId} type="number" className="w-36 text-8xl" />
                    <Link href="./menu" className="flex justify-center items-center px-3 bg-black border-2 border-white"><button onClick={handleTable} className="text-white">Үргэлжлүүлэх</button></Link>
                </div>
            </div>
        </div>
    )
}