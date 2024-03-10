import { useState, useContext } from "react";
// import styles from "@/styles/tableData.module.css";
import * as React from "react";
import styles from "@/styles/tableData.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { TableContext } from "@/context/TableContext";

const clock = [
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];
const people = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const date = new Date();
const year = date.getFullYear();
let month: number | string = date.getMonth() + 1;
let day: number | string = date.getDate();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
const today = `${year}-${month}-${day}`;

interface ITable {
  // _id: string;
  // table_number: string;
  table_date: string;
  table_time: string;
  table_people: string;
}
export default function TableData(): JSX.Element {
  const { showTable, setShowTable }: any = useContext(TableContext);
  const [currentTableData, setCurrentTableData] = useState<ITable>({
    table_date: today,
    table_time: "12:00",
    table_people: "1",
  });
  const FILTER_ORDER_URL = `${process.env.BACKEND_URL}/table/filter`;
  const router = useRouter();
  console.log(process.env.BACKEND_URL);
  function handleTime(e: any) {
    setCurrentTableData({
      ...currentTableData,
      table_time: e.target.value,
    });
  }

  function handleDate(e: any) {
    setCurrentTableData({
      ...currentTableData,
      table_date: e.target.value,
    });
  }
  function handlePeople(e: any) {
    setCurrentTableData({
      ...currentTableData,
      table_people: e.target.value,
    });
  }
  console.log(showTable);
  async function handleSubmit(e: any) {
    e.preventDefault();
    const newOrder = {
      _id: "",
      table_number: "",
      table_date: currentTableData.table_date,
      table_time: currentTableData.table_time,
      table_people: currentTableData.table_people,
    };
    console.log(currentTableData);
    const AXIOS_DATA = await axios.post(FILTER_ORDER_URL, currentTableData);
    console.log(AXIOS_DATA.data);

    if (AXIOS_DATA.status == 200) {
      if (AXIOS_DATA.data.length != 0) {
        if (typeof AXIOS_DATA.data[0].table_date == "undefined") {
          console.log(AXIOS_DATA.data[0].table_date);
          setShowTable([newOrder, ...AXIOS_DATA.data]);
        } else {
          AXIOS_DATA.data[0].table_people = currentTableData.table_people;
          setShowTable(AXIOS_DATA.data);
        }
      } else {
        setShowTable([
          {
            _id: "",
            table_number: "",
            table_date: currentTableData.table_date,
            table_time: currentTableData.table_time,
            table_people: currentTableData.table_people,
          },
        ]);
        console.log(showTable);
        router.push("/BookingTable");
      }
      router.push("/BookingTable");
    }
  }

  return (
    <div className="bg-black   font-light">
      <div className=" py-28 text-center  ">
        <h1 className=" text-5xl  text-white">ШИРЭЭ ЗАХИАЛГА</h1>
        <p className="text-white mt-8">Та ширээний цагаа сонгоно уу</p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-6 lg:grid-cols-7  text-start gap-2 my-20 container mx-auto "
        >
          <div className="col-span-6 sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">
              Өдөр
            </label>

            <input
              name="date"
              type="date"
              className={`w-full bg-black text-white border-2 border-gray-300  text-sm  block  p-[8px] focus:outline-none focus:border-white ${styles.dateInput}`}
              value={currentTableData.table_date}
              min={today}
              onChange={(e) => handleDate(e)}
              // required
              // pattern="[0-9]{2}:[0-9]{2}"
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">
              Цаг
            </label>
            <select
              id="countries"
              className=" border-2 border-gray-300  text-sm focus:outline-none focus:border-white block w-full p-2.5 bg-black text-white"
              onChange={handleTime}
              value={currentTableData.table_time}
            >
              {clock.map((time, index) => (
                <option value={time} key={index}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">
              Хүний тоо
            </label>
            <select
              id="countries"
              className=" border-2 border-gray-300   text-sm   block w-full p-2.5 focus:outline-none focus:border-white bg-black text-white"
              onChange={handlePeople}
              value={currentTableData.table_people}
            >
              {people.map((time, index) => (
                <option value={time} key={index}>
                  {time} хүн
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-6 lg:col-span-1 lg:flex flex-col justify-end text-center">
            <button className=" bg-black mt-2 text-white  border-2 border-gray-300 text-sm  p-[9.3px]  hover:border-white hover:bg-white hover:text-black">
              Суудал сонгох
            </button>
          </div>
        </form>
        <div className=" text-white">
          <h1 className="text-5xl p-8 font-normal">GALLERY</h1>
        </div>
        <div className="flex flex-wrap w-screen ">
          <img
            src="https://static.wixstatic.com/media/0b340f_78ad19e599d642a28de7ce823686cbc6~mv2.jpg/v1/fill/w_1020,h_728,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0b340f_78ad19e599d642a28de7ce823686cbc6~mv2.jpg"
            alt=""
            className="w-1/2 sm:w-1/4"
          />
          <img
            src="https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Steakhouse/08.jpg"
            alt=""
            className="w-1/2 sm:w-1/4"
          />
          <img
            src="https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Steakhouse/02.jpg"
            alt=""
            className="w-1/2 sm:w-1/4"
          />
          <img
            src="https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Steakhouse/03.jpg"
            alt=""
            className="w-1/2 sm:w-1/4"
          />
          <img
            src="https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Steakhouse/04.jpg"
            alt=""
            className="w-1/2 sm:w-1/4"
          />
          <img
            src="https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Steakhouse/05.jpg"
            alt=""
            className="w-1/2 sm:w-1/4"
          />
          <img
            src="https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Steakhouse/06.jpg"
            alt=""
            className="w-1/2 sm:w-1/4"
          />
          <img
            src="https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Steakhouse/07.jpg"
            alt=""
            className="w-1/2 sm:w-1/4"
          />
        </div>
      </div>
    </div>
  );
}
