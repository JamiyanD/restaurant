import React, { useEffect, useState } from "react";
import { AdminLayout } from "@layout";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function StaffList(): JSX.Element {
  const STAFF_URL = `${process.env.BACKEND_URL}/staffs`;
  const [staffs, setStaffs] = useState<Staff[]>([]);

  async function getStaffs(): Promise<void> {
    const FETCHED_DATA = await axios.get(STAFF_URL);
    setStaffs(FETCHED_DATA.data);
  }

  useEffect(() => {
    getStaffs();
  }, []);

  interface Staff {
    _id: string;
    username: string;
    role: string;
    password: string;
    date: string;
    staffNumber: string;
  }

  async function handleDelete(_id: any) {
    const data = {
      _id,
    };
    const AXIOS_DATA = await axios.delete(STAFF_URL, { data });
  }
  return (
    <AdminLayout>
      <div className="table-responsive">
        <table className="table border mb-0">
          <thead className="table-light fw-semibold ">
            <tr className="align-middle">
              <th>User_id</th>
              <th>Username</th>
              <th>Staff number</th>
              <th>Role</th>
              <th aria-label="Action" />
            </tr>
          </thead>
          <tbody>
            {staffs.map((user, index) => (
              <tr className="align-middle" key={index}>
                <td>
                  <div>{user._id}</div>
                </td>
                <td>
                  <div>{user.username}</div>
                </td>
                <td>
                  <div>{user.staffNumber}</div>
                </td>
                <td>{user.role}</td>
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
                      <Dropdown.Item href={`/staff/${user._id}`}>
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
