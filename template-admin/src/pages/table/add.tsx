import * as React from "react";

import axios from "axios";
import { AdminLayout } from "@layout";
import { useState } from "react";

const clock = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];
const people = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

interface ICurrentCustomer {
  table_number: string;
  table_email: string;
  table_date: string;
  table_time: string;
  table_people: string;
  table_joined_date: string;
}

export default function TableAdd() {
  const ADD_ORDER_URL = `${process.env.BACKEND_URL}/table`;
  const [currentCustomer, setCurrentCustomer] = useState<ICurrentCustomer>({
    table_number: "",
    table_email: "",
    table_date: "",
    table_time: "12:30",
    table_people: "1",
    table_joined_date: new Date().toString().substr(3, 21),
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    const AXIOS_DATA = await axios.post(ADD_ORDER_URL, currentCustomer);
    if (AXIOS_DATA.status === 200) {
      // const AXIOS_DATA = await axios.get(ADD_ORDER_URL);
      // console.log(AXIOS_DATA.data.data);
      //   setUsers(AXIOS_DATA.data.data);
      setCurrentCustomer({
        ...currentCustomer,
        table_number: "",
        table_email: "",
        table_date: "",
        table_time: "",
        table_people: "",
      });
    }
  }

  function handleName(e: any) {
    setCurrentCustomer({
      ...currentCustomer,
      table_number: e.target.value,
    });
  }

  function handleEmail(e: any) {
    setCurrentCustomer({
      ...currentCustomer,
      table_email: e.target.value,
    });
  }
  function handlePeople(e: any) {
    setCurrentCustomer({
      ...currentCustomer,
      table_people: e.target.value,
    });
  }
  function handleDate(e: any) {
    setCurrentCustomer({
      ...currentCustomer,
      table_date: e.target.value,
    });
  }
  function handleTime(e: any) {
    setCurrentCustomer({
      ...currentCustomer,
      table_time: e.target.value,
    });
  }

  return (
    <div>
      <AdminLayout>
        <div className="rounded-5 p-3">
          <div className="p-0">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <div className="p-0">
                  <p>Table Number</p>
                  <input
                    type="number"
                    name="table_number"
                    className="form-control shadow-none border-secondary mb-4"
                    placeholder="Table Number"
                    onChange={handleName}
                    value={currentCustomer.table_number}
                  />

                  <p>Email</p>
                  <input
                    name="table_email"
                    className="form-control shadow-none border-secondary mb-4"
                    placeholder="Email"
                    onChange={handleEmail}
                    value={currentCustomer.table_email}
                  />

                  <p>People</p>
                  <select
                    className="form-control shadow-none border-secondary mb-4"
                    onChange={handlePeople}
                    value={currentCustomer.table_people}
                  >
                    {people.map((time, index) => (
                      <option value={time} key={index}>
                        {time}хүн
                      </option>
                    ))}
                  </select>

                  <p>Date</p>
                  <input
                    type="date"
                    name="table_date"
                    className="form-control shadow-none border-secondary rounded-3 mb-4"
                    placeholder="Password"
                    onChange={handleDate}
                    value={currentCustomer.table_date}
                  />

                  <p>Time</p>
                  <select
                    id="countries"
                    className="form-control shadow-none border-secondary mb-4"
                    onChange={handleTime}
                  >
                    <option selected value="12:30">
                      12:30
                    </option>
                    {clock.map((time, index) => (
                      <option value={time} key={index}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-dark rounded-3 me-3">
                  Save Changes
                </button>
                <button type="submit" className="btn btn-dark rounded-3">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
