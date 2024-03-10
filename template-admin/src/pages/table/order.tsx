import axios from "axios";
import React, { useState, useEffect } from "react";
import { AdminLayout } from "@layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";

interface ITable {
  _id: string;
  table_number: string;
  table_email: string;
  table_date: string;
  table_time: string;
  table_people: string;
  table_status: string;
}
export default function TableOrder(): JSX.Element {
  const TABLE_URL = `${process.env.BACKEND_URL}/table`;
  const [showOrders, setShowOrders] = useState<ITable[]>([]);
  async function fetchTable(): Promise<void> {
    const FETCHED_DATA = await axios.get(TABLE_URL);
    // const FETCHED_JSON = await FETCHED_DATA.json();
    setShowOrders(FETCHED_DATA.data);
  }
  useEffect(() => {
    fetchTable();
  }, []);

  async function handleDelete(orderId: any) {
    const data = {
      orderId,
    };
    const AXIOS_DATA = await axios.delete(TABLE_URL, { data });
    setShowOrders(AXIOS_DATA.data);
  }

  // async function handleEdit(id: any) {
  //   const AXIOS_DATA = await axios.put(TABLE_URL, { orderId: id });
  //   // setCurrentOrder(AXIOS_DATA.data);
  //   // setStatusValue(AXIOS_DATA.data.order_status_name);
  // }

  return (
    <AdminLayout>
      <div className="table-responsive">
        <Link href="/table/add">
          <button type="button" className="btn btn-dark mb-2">
            Add order
          </button>
        </Link>
        <table className="table border mb-0">
          <thead className="table-light fw-semibold">
            <tr className="align-middle">
              <th className="text-center">№</th>
              <th>Email</th>
              <th>People</th>
              <th className="">Date</th>
              <th>Time</th>
              <th>Status</th>
              <th aria-label="Action" />
            </tr>
          </thead>
          <tbody>
            {showOrders.map((o, index) => (
              <tr className="align-middle" key={index}>
                <td className="text-center">{o.table_number}</td>
                <td>
                  <div>{o.table_email}</div>
                </td>
                <td>{o.table_people}</td>
                <td className="">{o.table_date}</td>
                <td>{o.table_time}</td>
                <td>{o.table_status}</td>
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="button"
                      bsPrefix="btn"
                      className="btn-link rounded-0 text-black-50 shadow-none p-0"
                      id="action-user1"
                    >
                      <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href={`/table/${o._id}`}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => {
                          handleDelete(o._id);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
