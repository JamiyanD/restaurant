import * as React from "react";
import axios from "axios";
import { AdminLayout } from "@layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface ICurrentCustomer {
  _id: string;
  email: string;
  password: string;
}

export async function getServerSideProps(req: any) {
  const { update } = req.params;
  return {
    props: {
      update,
    },
  };
}

export default function putUsers(props: any) {
  const SHOW_USER_URL = `${process.env.BACKEND_URL}/users/update`;
  const [currentCustomer, setCurrentCustomer] = useState<ICurrentCustomer>({
    _id: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  async function axiosProduct(): Promise<void> {
    const AXIOS_DATA = await axios.put(SHOW_USER_URL, { id: props.update });
    if (AXIOS_DATA.status === 200) {
      setCurrentCustomer(AXIOS_DATA.data);
    }
  }
  useEffect(() => {
    axiosProduct();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const AXIOS_DATA = await axios.post(SHOW_USER_URL, currentCustomer);
    if (AXIOS_DATA.status === 200) {
      router.push("/users/usersList");
      // const AXIOS_DATA = await axios.get(ADD_ORDER_URL);
      // console.log(AXIOS_DATA.data.data);
      //   setUsers(AXIOS_DATA.data.data);
      setCurrentCustomer({
        ...currentCustomer,
        email: "",
        password: "",
      });
    }
  }

  function handleEmail(e: any) {
    setCurrentCustomer({
      ...currentCustomer,
      email: e.target.value,
    });
  }
  function handlePassword(e: any) {
    setCurrentCustomer({
      ...currentCustomer,
      password: e.target.value,
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
                  <p>User information</p>

                  <p>Email</p>
                  <input
                    type=""
                    name="table_email"
                    className="form-control shadow-none border-secondary mb-4"
                    placeholder="Email"
                    onChange={handleEmail}
                    value={currentCustomer.email}
                  />

                  <p>Password</p>
                  <input
                    type="Password"
                    name="table_date"
                    className="form-control shadow-none border-secondary rounded-3 mb-4"
                    placeholder="Password"
                    onChange={handlePassword}
                    value={currentCustomer.password}
                  />
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
