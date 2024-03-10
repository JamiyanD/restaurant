import Header from "@/components/header";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { TableContext } from "@/context/TableContext";
import axios from "axios";

export default function BookingTableLogin(): JSX.Element {
  const initial = {
    email: "",
    password: "",
  };
  const ADD_ORDER_URL = `${process.env.BACKEND_URL}/table`;
  const USERS_URL = `${process.env.BACKEND_URL}/users`;
  const [contact, setContact] = useState(initial);
  const [helperText, setHelpetText] = useState("");
  const router = useRouter();
  const { showTable, setShowTable } = useContext(TableContext);
  console.log("login", showTable);
  const contactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  async function clickLogin() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    };
    const FETCHED_DATA = await fetch(USERS_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    console.log(FETCHED_JSON);

    if (FETCHED_JSON.status == 200) {
      const orderData = {
        table_number: showTable[0].table_number,
        table_people: showTable[0].table_people,
        table_date: showTable[0].table_date,
        table_time: showTable[0].table_time,
        table_email: FETCHED_JSON.data.email,
      };
      console.log(orderData);
      const AXIOS_DATA = await axios.post(ADD_ORDER_URL, orderData);
      console.log(AXIOS_DATA);
      if (AXIOS_DATA.status == 200) {
        setShowTable([AXIOS_DATA.data, ...showTable]);
        router.push("/BookingTableValidation");
      }
      // router.push("/BookingTableValidation");
    } else if (FETCHED_JSON.status == 400) {
      setHelpetText(FETCHED_JSON.message);
    }
  }

  return (
    <div className="bg-black text-md text-gray-300 font-serif h-screen">
      <Header />
      <div className="max-w-2xl m-auto pt-80  ">
        <p className="text-xl mb-2">Захиалга үүсгэх</p>
        <p className="text-red-700">{helperText}</p>
        <div className="flex justify-between flex-col gap-6">
          <div className="">
            <p>И-мэйл</p>
            <input
              className="bg-black border border-gray-100 h-8 w-full"
              onChange={contactChange}
              name="email"
              type="email"
            />
          </div>
          <div className="">
            <p>Нууц үг</p>
            <input
              className="bg-black border border-gray-100 h-8 w-full"
              onChange={contactChange}
              name="password"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-[#E8623D] w-full h-8 text-gray-900"
            onClick={clickLogin}
          >
            Үргэлжлүүлэх
          </button>
        </div>
      </div>
    </div>
  );
}
