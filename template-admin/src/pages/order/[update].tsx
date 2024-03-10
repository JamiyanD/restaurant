import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "@layout";

interface Order {
  _id: string;
  orderItems: [
    {
      foodName: string;
      orderQuantity: string;
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
  totalPrice: string;
  created_at: string;
}

export async function getServerSideProps(req: any) {
  const { update } = req.params;
  return {
    props: {
      update,
    },
  };
}

export default function updateFoods(props: any): JSX.Element {
  const router = useRouter();
  const [currentOrder, setCurrentOrder] = useState<Order>({
    _id: "",
    orderItems: [
      {
        foodName: "",
        orderQuantity: "",
        orderFeedback: "",
      },
    ],
    table: "",
    orderOwner: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    paymentType: "",
    orderType: "",
    orderStatus: "",
    totalPrice: "",
    created_at: "",
  });

  const SHOW_ORDER_URL = `${process.env.BACKEND_URL}/order/edit`;
  const UPDATE_URL = `${process.env.BACKEND_URL}/order/update`;
  console.log("props", props);

  async function axiosProduct(): Promise<void> {
    const AXIOS_DATA = await axios.post(SHOW_ORDER_URL, { id: props.update });
    console.log("Hhi");
    if (AXIOS_DATA.status === 200) {
      setCurrentOrder(AXIOS_DATA.data);
    }
  }
  useEffect(() => {
    axiosProduct();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(currentOrder);

    const AXIOS_DATA = await axios.post(UPDATE_URL, currentOrder);
    console.log(AXIOS_DATA);
    if (AXIOS_DATA.status === 200) {
      console.log("=========", AXIOS_DATA.data);

      setCurrentOrder({
        ...currentOrder,
        orderType: "",
        orderStatus: "",
      });
      router.push("/order/orderList");
    }
  }

  function handleType(e: any) {
    setCurrentOrder({
      ...currentOrder,
      orderType: e.target.value,
    });
  }
  function handleStatus(e: any) {
    console.log(e.target.value);
    setCurrentOrder({
      ...currentOrder,
      orderStatus: e.target.value,
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
                  <p>Order information</p>

                  <p>Order Type</p>
                  <select
                    name="category"
                    className="form-control shadow-none border-secondary rounded-3 mb-4"
                    placeholder="Category"
                    onChange={handleType}
                  >
                    <option value="">-</option>
                    <option value="Авч явах">Авч явах</option>
                    <option value="Сууж идэх">Сууж идэх</option>
                  </select>

                  <p>Order Status</p>
                  <select
                    name="category"
                    className="form-control shadow-none border-secondary rounded-3 mb-4"
                    placeholder="Category"
                    onChange={handleStatus}
                  >
                    <option value="">-</option>
                    <option value="Хийгдэж байгаа">Хийгдэж байгаа</option>
                    <option value="Бэлэн болсон">Бэлэн болсон</option>
                    <option value="Цуцлагдсан">Цуцлагдсан</option>
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
