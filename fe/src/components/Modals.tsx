import { TablesContext } from "@/context/TablesContext";
import { Box, Modal } from "@mui/material";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function ModalDetail({ openDetail, setOpenDetail, filteredFood }: any) {
  const { tableId }: any = useContext(TablesContext);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");

  const URL_ORDER_CREATE = `${process.env.BACKEND_URL}/basket/addOrder`;

  function handleQuantityPlus() {
    setQuantity(quantity + 1);
  }

  function handleQuantityMinus() {
    setQuantity(quantity - 1);
  }

  function handleFeedback(e: any) {
    setFeedback(e.target.value);
  }

  async function handleOrder() {
    const food = filteredFood[0];

    const basketItemData = {
      _id: food._id,
      foodName: food.foodName,
      orderQuantity: quantity,
      orderFeedback: feedback,
      totalPrice: filteredFood[0].price * quantity,
    };

    const orderData = {
      basketItem: [basketItemData],
      table: tableId,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    };
    const FETCHED_DATA = await fetch(URL_ORDER_CREATE, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    console.log("orderData", orderData);
    console.log("============fetched json ===========", FETCHED_JSON);

    setOpenDetail(false);
  }

  return (
    <div>
      {filteredFood.map((food: any, index: any) => (
        <Modal
          key={index}
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <Box
            className="border border-[#252525] bg-black w-11/12 h-4/5 md:w-3/5 lg:w-1/3 flex flex-col justify-center items-center justify-between"
            boxShadow={"0 0 100px rgb(0 0 0 / 0.7)"}
          >
            <img
              className="w-full h-1/3 object-cover"
              src={food.imgUrl}
              alt="food"
            />
            <div className="flex flex-col justify-around h-1/2 w-10/12 mb-8">
              <h1 className="text-xl lg:text-3xl text-white my-4">
                {food.foodName}
              </h1>
              <p className="h-2/3 text-sm lg:text-md text-white overflow-auto">
                {food.description}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-10/12">
              <div className="flex flex-col w-full h-16 border border-slate-300">
                <span className="text-white">Feedback</span>
                <input
                  onChange={handleFeedback}
                  className="bg-black text-white"
                  type="text"
                  placeholder="Сонгино хийхгүй, дундуур нь хуваах г.м"
                />
              </div>
              <div className="w-full md:my-8 h-16 flex justify-center items-center">
                <div className="flex justify-around items-center bg-black w-1/5 h-8 md:h-12 border border-slate-300 mr-2">
                  <button
                    className="text-[#454545]"
                    onClick={handleQuantityMinus}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <h1 className="text-[white]">{quantity}</h1>
                  <button
                    className="text-[#454545]"
                    onClick={handleQuantityPlus}
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
                <button
                  className=" text-sm md:text-md bg-[#E17148] hover:bg-[#b35a39] w-4/5 h-8 md:h-12"
                  onClick={handleOrder}
                >
                  Сагсанд нэмэх
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      ))}
    </div>
  );
}

function ModalOrder({ openOrder, setOpenOrder }: any) {
  const URL_ORDER_LIST = `${process.env.BACKEND_URL}/basket/list`;
  const URL_BASKETITEM_DELETE = `${process.env.BACKEND_URL}/basket/deleteBasketItem`;

  const { tableId }: any = useContext(TablesContext);
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");

  async function fetchOrders(): Promise<void> {
    const FETCHED_DATA = await fetch(URL_ORDER_LIST);
    const FETCHED_JSON = await FETCHED_DATA.json();
    const filteredOrders = FETCHED_JSON.filter(
      (order: any) => order.table === tableId
    );
    if (filteredOrders.length !== 0) {
      setOrders(filteredOrders[0].basketItem);
      setOrderId(filteredOrders[0]._id);
    }
  }

  async function handleDeleteItem(id: any, orderId: any) {
    console.log("ID+++++++++++++++++++", id);

    const deleteId = {
      id: id,
      orderId: orderId,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteId),
    };
    const FETCHED_DATA = await fetch(URL_BASKETITEM_DELETE, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    console.log(FETCHED_JSON);
    fetchOrders();
  }

  useEffect(() => {
    fetchOrders();
  }, [openOrder]);

  return (
    <Modal
      open={openOrder}
      onClose={() => setOpenOrder(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center"
    >
      <Box
        className="border bg-black w-11/12 h-4/5 md:w-3/5 lg:w-1/3 flex flex-col justify-center items-center justify-between"
        boxShadow={"0 0 100px rgb(0 0 0 / 0.7)"}
      >
        <div className="border-b w-11/12">
          <h1 className="text-white text-4xl lg:text-4xl text-center mb-2">
            Захиалга
          </h1>
        </div>
        <div className="overflow-auto h-full w-11/12">
          {orders.map((order: any, index) => (
            <div
              key={index}
              className="flex justify-between items-center h-1/6 border-b-2 w-full"
            >
              <div className="flex flex-col justify-center items-center w-2/5">
                <h1 className="text-white">{order.foodName}</h1>
                <p className="text-slate-400">{order.orderFeedback}</p>
              </div>
              <h1 className="text-white text-center w-1/5">
                {order.orderQuantity}
              </h1>
              <h1 className="text-[#E17148] text-xl w-1/5">
                {order.totalPrice}
              </h1>
              <button
                onClick={() => handleDeleteItem(order._id, orderId)}
                className="bg-[#E17148] rounded-full w-1/5"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className=" w-10/12 md:my-8 h-16 flex justify-center items-center">
          <Link
            href="./checkout"
            className="flex justify-center bg-[#E17148] hover:bg-red-700 w-4/5 h-12 md:h-16 mb-8"
          >
            <button className="text-black text-sm md:text-md ">
              Төлбөр төлөх
            </button>
          </Link>
        </div>
      </Box>
    </Modal>
  );
}

function ModalMenu() {
  return (
    <Box
      className="w-1/2 h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "black" }}
    >
      <div className="">
        <ul className="text-white">
          <li className="my-8">
            <Link className="hover:text-red-700" href="/">
              Нүүр хуудас
            </Link>
          </li>
          <li className="my-8">
            <Link className="hover:text-red-700" href="/checkingMenu">
              Меню
            </Link>
          </li>
          <li className="my-8">
            <Link className="hover:text-red-700" href="/BookingTableData">
              Ширээ захиалга
            </Link>
          </li>
          <li className="my-8">
            <Link className="hover:text-red-700" href="/checkingOrder">
              Захиалга шалгах
            </Link>
          </li>
          <li className="my-8">
            <Link className="hover:text-red-700" href="/AboutUs">
              Бидний тухай
            </Link>
          </li>
        </ul>
      </div>
    </Box>
  );
}

function ModalMenuDetail({ openDetail, setOpenDetail, filteredFood }: any) {
  return (
    <div>
      {filteredFood.map((food: any, index: any) => (
        <Modal
          key={index}
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <Box
            className="border border-[#252525] bg-black w-11/12 h-fit md:w-3/5 lg:w-1/3 flex flex-col justify-center items-center justify-between"
            boxShadow={"0 0 100px rgb(0 0 0 / 0.7)"}
          >
            <img
              className="w-full h-1/2 object-cover"
              src={food.imgUrl}
              alt="food"
            />
            <div className="flex flex-col justify-around h-1/2 w-10/12 mb-8">
              <h1 className="text-xl lg:text-3xl text-white my-4">
                {food.foodName}
              </h1>
              <p className="h-2/3 text-sm lg:text-md text-white overflow-auto">
                {food.description}
              </p>
            </div>
          </Box>
        </Modal>
      ))}
    </div>
  );
}
export { ModalDetail, ModalOrder, ModalMenu, ModalMenuDetail };
