import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "@layout";

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
const people = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];

interface ITable {
  _id: string;
  table_number: string;
  table_email: string;
  table_date: string;
  table_time: string;
  table_people: string;
  table_joined_date: string;
}

export async function getServerSideProps(req: any) {
  const { update } = req.params;
  return {
    props: {
      update,
    },
  };
}

export default function putTableOrders(props: any): JSX.Element {
  const [currentTable, setCurrentTable] = useState<ITable>({
    _id: "",
    table_number: "",
    table_email: "",
    table_date: "",
    table_time: "12:30",
    table_people: "",
    table_joined_date: new Date().toString().substr(3, 21),
  });
  const SHOW_TABLE_URL = `${process.env.BACKEND_URL}/table/edit`;
  const UPDATE_URL = `${process.env.BACKEND_URL}/table/update`;

  async function axiosProduct(): Promise<void> {
    const AXIOS_DATA = await axios.post(SHOW_TABLE_URL, { id: props.update });
    if (AXIOS_DATA.status === 200) {
      setCurrentTable(AXIOS_DATA.data);
    }
  }

  useEffect(() => {
    axiosProduct();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const AXIOS_DATA = await axios.post(UPDATE_URL, currentTable);
    if (AXIOS_DATA.status === 200) {
      setCurrentTable({
        ...currentTable,
        table_number: "",
        table_email: "",
        table_date: "",
        table_time: "",
        table_people: "",
      });
    }
  }

  function handleName(e: any) {
    setCurrentTable({
      ...currentTable,
      table_number: e.target.value,
    });
  }

  function handleEmail(e: any) {
    setCurrentTable({
      ...currentTable,
      table_email: e.target.value,
    });
  }
  function handlePeople(e: any) {
    setCurrentTable({
      ...currentTable,
      table_people: e.target.value,
    });
  }
  function handleDate(e: any) {
    setCurrentTable({
      ...currentTable,
      table_date: e.target.value,
    });
  }
  function handleTime(e: any) {
    setCurrentTable({
      ...currentTable,
      table_time: e.target.value,
    });
  }
  return (
    <div>
      <AdminLayout>
        <div className="rounded-5 p-3">
          <div className="p-0">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div>
                <div className="p-0">
                  <p>Table Number</p>
                  <input
                    type="number"
                    name="table_number"
                    className="form-control shadow-none border-secondary mb-4"
                    placeholder="Table Number"
                    onChange={handleName}
                    value={currentTable.table_number}
                  />

                  <p>Email</p>
                  <input
                    type=""
                    name="table_email"
                    className="form-control shadow-none border-secondary mb-4"
                    placeholder="Email"
                    onChange={handleEmail}
                    value={currentTable.table_email}
                  />
                  <p>People</p>
                  <select
                    id="countries"
                    className="form-control shadow-none border-secondary mb-4"
                    onChange={handlePeople}
                    value={currentTable.table_people}
                  >
                    <option selected value="12:30">
                      1
                    </option>
                    {people.map((time, index) => (
                      <option value={time} key={index}>
                        {time}
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
                    value={currentTable.table_date}
                  />

                  <p>Time</p>
                  <select
                    id="countries"
                    className="form-control shadow-none border-secondary mb-4"
                    onChange={handleTime}
                    value={currentTable.table_time}
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
              <div className="">
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
