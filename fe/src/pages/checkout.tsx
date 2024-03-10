import { TablesContext } from "@/context/TablesContext";
import Link from "next/link";
import React, { useState, ChangeEvent, useContext, useEffect } from "react";

export default function Checkout(): JSX.Element {
  const initial = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  };

  const { tableId }: any = useContext(TablesContext);
  const [contact, setContact] = useState(initial);
  const [contactshow, setContactshow] = useState(false);
  const [tableNumber, setTableNumber] = useState();
  const [select, setSelect] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [orders, setOrders] = useState([]);
  const URL_TABLE_NUMBER = `${process.env.BACKEND_URL}/tables/tableNumber/${tableId}`;
  const URL_ORDER_LIST = `${process.env.BACKEND_URL}/basket/list`;
  const CREATE_ORDER = `${process.env.BACKEND_URL}/order/createOrder`;
  const URL_TABLE = `${process.env.BACKEND_URL}/table`;

  const contactChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  async function fetchOrders(): Promise<void> {
    const FETCHED_DATA = await fetch(URL_ORDER_LIST);
    const FETCHED_JSON = await FETCHED_DATA.json();
    const filteredOrders = FETCHED_JSON.filter(
      (order: any) => order.table === tableId
    );
    setOrders(filteredOrders[0].basketItem);
    console.log("---------", orders);
  }

  async function fetchTableNumber() {
    const FETCHED_DATA = await fetch(URL_TABLE_NUMBER);
    const FETCHED_JSON = await FETCHED_DATA.json();
    setTableNumber(FETCHED_JSON.tableNumber);
  }

  function handleSelectChange(e: any) {
    console.log(e.target.value);
    setSelect(e.target.value);
    console.log(select);
  }

  useEffect(() => {
    fetchTableNumber();
    fetchOrders();
  }, []);

  function contactshowHandler() {
    setContactshow(!contactshow);
  }

  function handleOptionChange(e: any) {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
  }

  async function handleCreateOrder() {
    handleTableNumber();
    const orderData = {
      orderItems: orders,
      table: tableId,
      orderOwner: contact,
      paymentType: select,
      orderType: selectedOption,
      totalPrice: sum,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    };
    const FETCHED_DATA = await fetch(CREATE_ORDER, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    console.log("orderData", orderData);
    console.log("============fetched json ===========", FETCHED_JSON);
  }

  async function handleTableNumber() {
    let tablePeople = 1;
    if (Number(tableNumber) >= 1 && Number(tableNumber) <= 5) {
      tablePeople = 1;
    } else if (Number(tableNumber) == 10 || Number(tableNumber) == 11) {
      tablePeople = 1;
    } else if (Number(tableNumber) >= 6 && Number(tableNumber) <= 9) {
      tablePeople = 5;
    } else if (Number(tableNumber) == 12 || Number(tableNumber) == 13) {
      tablePeople = 8;
    }
    const table = {

      table_number : tableNumber,
      table_status : 'offline',
      table_people : tablePeople,
      table_time : "12:00",
      table_date : "2023-05-26"
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(table),
    };
    const FETCHED_DATA = await fetch(URL_TABLE, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    console.log("orderData", table);
    console.log("============fetched json ===========", FETCHED_JSON);
  }

  // tableNumber, contact, select, selectedOption
  let sum = 0;
  return (
    <div className="bg-black text-md text-gray-300 font-serif h-full">
      <div
        className="flex items-center"
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
        <h1 className="text-4xl md:text-6xl text-black ml-8">
          Захиалга баталгаажуулах
        </h1>
      </div>
      <div className="max-w-4xl m-auto">
        <div className="md:flex justify-between items-center sm:flex-none">
          <div className="md:w-6/12 sm:w-full p-4">
            <div>
              <div className="flex justify-between py-5">
                <p className="text-xl text-[#E17148]">Table info</p>
              </div>

              <p>Table number: {tableNumber}</p>
            </div>

            <div>
              <div className="flex justify-between py-5">
                <p className="text-xl text-[#E17148]">Contact information</p>
              </div>

              {!contactshow ? (
                <div className="grid gap-2 lg:grid-cols-2 md:grid-cols-none sm:grid-cols-none mb-5 ">
                  <div className="">
                    <p className="">First Name</p>
                    <input
                      className="bg-black border border-gray-100 h-8 w-full"
                      onChange={contactChange}
                      name="firstName"
                    />
                  </div>
                  <div className="">
                    <p>Last Name</p>
                    <input
                      className="bg-black border border-gray-100 h-8 w-full"
                      onChange={contactChange}
                      name="lastName"
                    />
                  </div>
                  <div className="">
                    <p>E-mail</p>
                    <input
                      className="bg-black border border-gray-100 h-8 w-full"
                      onChange={contactChange}
                      name="email"
                    />
                  </div>
                  <div className="">
                    <p>Phone</p>
                    <input
                      className="bg-black border border-gray-100 h-8 w-full"
                      onChange={contactChange}
                      name="phone"
                    />
                  </div>
                  <button
                    className="bg-[#E8623D] w-full h-8 text-gray-900"
                    onClick={contactshowHandler}
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="text-gray-300">
                  <p>{contact.firstName}</p>
                  <p>{contact.lastName}</p>
                  <p>{contact.phone}</p>
                  <p>{contact.email}</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between py-5">
                <p className="text-xl text-[#E17148]">Payment</p>
              </div>
              <select
                className="bg-black border border-gray-100 h-8 w-full mb-5"
                onChange={handleSelectChange}
              >
                <option value="Банкны картаар">Банкны картаар</option>
                <option value="QPAY">QPAY</option>
                <option value="Бэлэн мөнгөөр">Бэлэн мөнгөөр</option>
              </select>
            </div>
            <div>
              <div className="flex justify-between py-5">
                <p className="text-xl text-[#E17148]">Order Type</p>
              </div>
              <form className="flex justify-around w-1/2">
                <input
                  type="radio"
                  name="type"
                  value="Сууж идэх"
                  checked={selectedOption === "Сууж идэх"}
                  onChange={handleOptionChange}
                />
                <label>Сууж идэх</label>

                <input
                  type="radio"
                  name="type2"
                  value="Авч явах"
                  checked={selectedOption === "Авч явах"}
                  onChange={handleOptionChange}
                />
                <label>Авч явах</label>
              </form>
            </div>
          </div>

          <div className="md:w-5/12 sm:w-full p-4 ">
            <div className=" sticky top-28">
              <div className="top-10 border border-white p-4">
                <p className="text-xl">My Order</p>
                <div>
                  {orders.map((order: any, index: any) => (
                    <div key={index} className="flex gap-9 mt-4">
                      <p className="w-1/5">{order.orderQuantity}x</p>
                      <p className="w-2/5">{order.foodName}</p>
                      <p className="w-1/5">{order.totalPrice}₮</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-x border-white">
                <p className="text-[#E8623D]">Order notes</p>
                <div>
                  {orders.map((order: any, index: any) => {
                    if (order.orderFeedback === "") {
                      return null;
                    }
                    return (
                      <div key={index} className="flex justify-between">
                        <p className="w-3/5">{order.foodName}</p>
                        <p className="w-1/5">{order.orderFeedback}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p-4 border border-white">
                <div className="flex justify-between text-lg">
                  <p>Total</p>
                  {orders.map((order: any) => (sum = order.totalPrice + sum))}
                  <p>{sum}₮</p>
                </div>
              </div>
              <Link href="./orderSuccess">
                <button
                  onClick={handleCreateOrder}
                  className="bg-[#E8623D] border border-white w-full h-16 text-gray-900"
                >
                  Submit Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
