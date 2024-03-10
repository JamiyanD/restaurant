import React, { createContext, useState, useEffect, useContext } from "react";

interface OrderContextType {
  orderCheck: string;
  setOrderCheck: React.Dispatch<React.SetStateAction<string>>;
  order: Record<string, unknown>;
  handleCheckingOrder: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fetchCheckingOrder: () => void;
}

export const OrderContext = createContext<OrderContextType | any>(undefined);

export const useOrderContext = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const URL_ORDER = `${process.env.BACKEND_URL}/order/checkingOrder`;
  const [orderCheck, setOrderCheck] = useState("");
  const [order, setOrder] = useState<Record<string, unknown>>({
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
    created_at: Date,
  });

  const handleCheckingOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOrderCheck(e.target.value);
    console.log("Order check ===============", orderCheck);
  };

  const fetchCheckingOrder = async () => {
    const data = {
      phoneNumber: orderCheck,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const FETCHED_DATA = await fetch(URL_ORDER, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    setOrder(FETCHED_JSON.data);
    console.log("sdasda", order);
  };

  useEffect(() => {
    fetchCheckingOrder();
  }, [orderCheck]);

  return (
    <OrderContext.Provider
      value={{
        orderCheck,
        setOrderCheck,
        order,
        handleCheckingOrder,
        fetchCheckingOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
