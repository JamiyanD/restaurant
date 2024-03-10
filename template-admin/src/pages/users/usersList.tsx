import React, { useEffect, useState } from "react";
import { AdminLayout } from "@layout";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Link from "next/link";

export default function Users(): JSX.Element {
  const USER_URL = `${process.env.BACKEND_URL}/users`;
  const [users, setUsers] = useState<User[]>([]);
  async function fetchUsers(): Promise<void> {
    const FETCHED_DATA = await axios.get(USER_URL);
    setUsers(FETCHED_DATA.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  interface User {
    _id: string;
    username: string;
    email: string;
    phonenumber: number;
    password: string;
    date: string;
  }

  async function handleDelete(_id: any) {
    const data = {
      _id,
    };
    const AXIOS_DATA = await axios.delete(USER_URL, { data });
    setUsers(AXIOS_DATA.data.data);
  }
  return (
    <AdminLayout>
      <div className="table-responsive">
        <Link href="/users/add">
          <button type="button" className="btn btn-dark mb-2">
            Add User
          </button>
        </Link>
        <table className="table border mb-0">
          <thead className="table-light fw-semibold ">
            <tr className="align-middle">
              <th>User_id</th>
              <th>Email</th>
              <th>Password</th>
              <th aria-label="Action" />
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="align-middle" key={index}>
                <td>
                  <div>{user._id}</div>
                </td>
                <td>
                  <div>{user.email}</div>
                </td>
                <td>{user.password}</td>
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
                      <Dropdown.Item href={`/users/${user._id}`}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => {
                          handleDelete(user._id);
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
