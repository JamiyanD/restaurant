import React, { useEffect, useState } from "react";
import { AdminLayout } from "@layout";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Link from "next/link";

export default function Users(): JSX.Element {
  const FOOD_URL = `${process.env.BACKEND_URL}/foods/list`;
  const DELETE_FOOD_URL = `${process.env.BACKEND_URL}/foods/deleteFoods`;
  const [foods, setFoods] = useState<Food[]>([]);

  async function fetchFoods(): Promise<void> {
    try {
      const response = await axios.get(FOOD_URL);
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  }

  useEffect(() => {
    fetchFoods();
  }, [foods]);

  interface Food {
    _id: string;
    foodName: string;
    description: string;
    price: number;
    imgUrl: string;
    category: string;
    orderQuantity: number;
    orderFeedback?: string;
    totalPrice: number;
  }

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
    const FETCHED_DATA = await fetch(DELETE_FOOD_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
  }

  return (
    <AdminLayout>
      <div className="table-responsive">
        <Link href="/foods/add">
          <button type="button" className="btn btn-dark mb-2">
            Add Food
          </button>
        </Link>
        <table className="table border mb-0">
          <thead className="table-light fw-semibold ">
            <tr className="align-middle">
              <th>Food Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>ImageURL</th>
              <th aria-label="Action" />
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr className="align-middle" key={index}>
                <td>
                  <div>{food.foodName}</div>
                </td>
                <td>
                  <div>{food.category}</div>
                </td>
                <td>
                  <div>{food.price}</div>
                </td>
                <td>
                  <div>{food.description.substring(0, 20)}</div>
                </td>
                <td>
                  <div>
                    <img style={{ width: "50px" }} src={food.imgUrl} alt="" />
                  </div>
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
                      <Dropdown.Item href={`/foods/${food._id}`}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => {
                          handleDelete(food._id);
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
