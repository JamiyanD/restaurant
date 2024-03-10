import React, { useEffect, useState } from "react";
import { AdminLayout } from "@layout";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Link from "next/link";

export default function Users(): JSX.Element {
  const ORDER_URL = `${process.env.BACKEND_URL}/order/list`;
  const DELETE_ORDER_URL = `${process.env.BACKEND_URL}/order/deleteOrder`;
  // const URL_TABLE_NUMBER = `http://localhost:8080/table/tableNumber/${order.table}`

  const [orders, setOrders] = useState<Order[]>([]);

  interface Order {
    _id: string;
    orderItems:[
      {
        foodName: string;
        orderQuantity: number;
        orderFeedback: string;
      }
    ];
    table: string;
    orderOwner: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
    };
    paymentType: string;
    orderType: string;
    orderStatus: string;
    totalPrice: number;
    created_at: Date;
  }

  async function fetchOrders(): Promise<void> {
    try {
      const response = await axios.get(ORDER_URL);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  }

  // async function fetchTableNumber() {
  //     const FETCHED_DATA = await fetch(URL_TABLE_NUMBER);
  //     const FETCHED_JSON = await FETCHED_DATA.json();
  //     console.log("TABLENUMBER", FETCHED_JSON)
  //     // setOrders({...orders, table: FETCHED_JSON.tableNumber})
  // }

  useEffect(() => {
    fetchOrders();
  }, [orders]);

  async function handleDelete(_id: any) {
    const data = {
      _id,
    };
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const FETCHED_DATA = await fetch(DELETE_ORDER_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
  }

  return (
    <AdminLayout>
      <div className="table-responsive">
        <Link href="/order/add">
          <button type="button" className="btn btn-dark mb-2">
            Add Order
          </button>
        </Link>
        <table className="table border mb-0">
          <thead className="table-light fw-semibold ">
            <tr className="align-middle">
              <th>Order id</th>
              <th>Foods</th>
              <th>Table</th>
              <th>Order Type</th>
              <th>Order Status</th>
              <th>Total Price</th>
              <th aria-label="Action" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr className="align-middle" key={index}>
                <td>
                  <div>{order._id}</div>
                </td>
                <td>
                  <div>
                    {order.orderItems.map((foods) => (
                      <div className="text-center" key={index}>
                        <div>{foods.foodName}</div>
                        <div>x{foods.orderQuantity}</div>
                        <div>{foods.orderFeedback}</div>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div>{order.table}</div>
                </td>
                <td>
                  <div>{order.orderType}</div>
                </td>
                <td>
                  <div>{order.orderStatus}</div>
                </td>
                <td>
                  <div>{order.totalPrice}</div>
                </td>
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="button"
                      bsPrefix="btn"
                      className="btn-link rounded-0 text-black-50 shadow-none p-0"
                      id="action-user3"
                    >
                      <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href={`/order/${order._id}`}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => {
                          handleDelete(order._id);
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
