import { useState } from "react";
import styles from "@/styles/tableData.module.css";

import SmallTable from "@/components/SmallTable";
import MiddleTable from "@/components/MiddleTable";
import BigTable from "@/components/BigTable";
import axios from "axios";
import * as React from "react";
import ExampleTable from "@/components/ExampleTable";
import { useContext, useEffect } from "react";
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

export default function BookingTable(): JSX.Element {
  const FILTER_ORDER_URL = `${process.env.BACKEND_URL}/table/filter`;
  const GET_ORDERS_URL = `${process.env.BACKEND_URL}/table`;
  const [safeOrders, setSafeOrders] = useState([]);
  const { showTable, setShowTable }= useContext(TableContext);
  const [currentTableData, setCurrentTableData] = useState<ITable>({
    table_date: showTable[0].table_date,
    table_time: showTable[0].table_time,
    table_people: showTable[0].table_people,
  });
  async function getOrders() :Promise<void> {
    const AXIOS_DATA = await axios.get(GET_ORDERS_URL);
    setSafeOrders(AXIOS_DATA.data);
    console.log(safeOrders);
  }
  useEffect(() => {
    getOrders();
  }, []);

  async function handleTime(e: React.ChangeEvent<HTMLSelectElement>) {
    // const filteredOrders = safeOrders.filter((t: any) => {
    //   return t.table_time == e.target.value;
    // });
    // console.log(filteredOrders);
    // setShowTable(filteredOrders);
    setCurrentTableData({
      ...currentTableData,
      table_time: e.target.value,
    });
    const timeData = {
      table_date: currentTableData.table_date,
      table_time: e.target.value,
      table_people: currentTableData.table_people,
    };
    console.log(timeData);
    const AXIOS_DATA = await axios.post(FILTER_ORDER_URL, timeData);
    if (AXIOS_DATA.data.length != 0) {
      setShowTable(AXIOS_DATA.data);
    } else {
      setShowTable([timeData]);
    }
  }

  async function handleDate(e: any) {
    console.log(e.target.value);
    setCurrentTableData({
      ...currentTableData,
      table_date: e.target.value,
    });

    const dateData = {
      table_date: e.target.value,
      table_time: currentTableData.table_time,
      table_people: currentTableData.table_people,
    };
    console.log(dateData);
    const AXIOS_DATA = await axios.post(FILTER_ORDER_URL, dateData);
    if (AXIOS_DATA.data.length != 0) {
      setShowTable(AXIOS_DATA.data);
    } else {
      setShowTable([dateData]);
    }
  }
  async function handlePeople(e: any) {
    console.log(e.target.value);
    setCurrentTableData({
      ...currentTableData,
      table_people: e.target.value,
    });

    const peopleData = {
      table_date: currentTableData.table_date,
      table_time: currentTableData.table_time,
      table_people: e.target.value,
    };
    console.log(peopleData);
    const AXIOS_DATA = await axios.post(FILTER_ORDER_URL, peopleData);
    if (AXIOS_DATA.data.length != 0) {
      AXIOS_DATA.data[0].table_people = e.target.value;
      setShowTable(AXIOS_DATA.data);
    } else {
      setShowTable([peopleData]);
    }
  }

  return (
    <div className=" bg-black text-white">
      {/* <Header /> */}
      <div className="pt-10 text-center container mx-auto">
        <h1 className="text-center text-5xl  text-white">ШИРЭЭ ЗАХИАЛГА</h1>
        <p className="text-white my-5">Та ширээний цагаа сонгоно уу?</p>
        <div className="grid grid-cols-6  text-start gap-2 mb-10 w-100">
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
              onChange={(e) => void handleDate(e)}
              required
              pattern="[0-9]{2}:[0-9]{2}"
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white">
              Цаг
            </label>
            <select
              id="countries"
              className=" border-2 border-gray-300  text-sm focus:outline-none focus:border-white block w-full p-2.5 bg-black text-white"
              onChange={(e) => void handleTime(e)}
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
              onChange={(e) =>  void handlePeople(e)}
              value={currentTableData.table_people}
            >
              {people.map((time, index) => (
                <option value={time} key={index}>
                  {time} хүн
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className=" gap-4 grid grid-cols-4 container  mx-auto">
        <div className=" col-span-4 lg:col-span-4  flex flex-col gap-5 p-3">
          <h1 className="my-5  border-b-2 pb-9">ТА СУУДЛАА СОНГОНО УУ?</h1>
          <p className="text-gray-400">
            Та боломжит ширээн дээр дарж захиалгаа цааш үргэлжлүүлнэ үү.
          </p>
          <div className="flex gap-20 justify-center py-5">
            <div className="flex gap-5">
              <ExampleTable tableSize={styles.exampleTable1} />
              <p>Боломжит</p>
            </div>
            <div className="flex gap-5">
              <ExampleTable tableSize={styles.exampleTable2} />{" "}
              <p>Захиалагдсан</p>
            </div>
          </div>
          <div className={`${styles.room} mx-auto `}>
            <SmallTable />
            <MiddleTable />
            <BigTable />
            <div className={styles.stage}>
              <div className={styles.stageInner}>Тайз</div>
            </div>
            <div className={styles.bar}>
              <div className={`${styles.barChair1} ${styles.barChair}`} />
              <div className={`${styles.barChair2} ${styles.barChair}`} />
              <div className={`${styles.barChair3} ${styles.barChair}`} />
              <div className={`${styles.barChair4} ${styles.barChair}`} />
              <div className={`${styles.barChair5} ${styles.barChair}`} />
              <div className={`${styles.barChair6} ${styles.barChair}`} />
              <div className={styles.barInner}>Тек</div>
            </div>
            <div className={styles.gate}>Хаалга</div>
          </div>
          <div className="text-end border-t-2 my-10">
            <button className="mt-5 border-2 border-gray-300  hover:border-white hover:bg-white hover:text-black focus:outline-none text-whitefocus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 ">
              Буцах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
