import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function UserEdit() {
  interface User {
    id: string;
    username: string;
    email: string;
    phonenumber: number;
    password: string;
    date: Date;
  }
  const USER_URL = `${process.env.BACKEND_URL}/users`;

  async function fetchUsers(): Promise<void> {
    const FETCHED_DATA = await axios.get(USER_URL);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleDelete(_id: any) {
    const data = {
      _id,
    };
    const AXIOS_DATA = await axios.delete(USER_URL, { data });
  }
  return (
    <div>
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
          <Dropdown.Item href="">Edit</Dropdown.Item>
          <Dropdown.Item className="text-danger" onClick={handleDelete}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
