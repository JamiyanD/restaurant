import { useContext, useState } from "react";
import { TableContext } from "@/context/TableContext";
import * as React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  px: 3,
  py: 4,
};

export default function BookingTableValidation(): JSX.Element {
  const TABLE_URL = `${process.env.BACKEND_URL}/table`;
  const { showTable }: any = useContext(TableContext);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("jaya@gmail.com");
  const [showValidation, setShowValidation] = useState(false);

  async function handleDelete() {
    if (showTable[0].table_email == inputValue) {
      const data = {
        table_number: showTable[0].table_number,
        table_date: showTable[0].table_date,
        table_time: showTable[0].table_time,
      };
      console.log(data);
      const AXIOS_DATA = await axios.delete(TABLE_URL, { data });
      if (AXIOS_DATA.status == 200) {
        router.push("/BookingTableData");
        setShowValidation(false);
      }
    } else {
      setShowValidation(true);
    }
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleInput(e: any) {
    setInputValue(e.target.value);
  }

  return (
    <div className="bg-black text-white font-light">
      <div className=" container  mx-auto flex-col gap-6 flex mb-20 mt-5 py-28">
        <h1 className="text-center text-5xl font-bold">
          Таны ширээ амжилттай захиалагдлаа.
        </h1>
        <p className="text-center">
          Таныг ширээний мэдээлэлийг мэйл хаягаар тань илгээх болно.
        </p>

        <div className="border-2 p-8 ">
          <p>Захиалгын дэлгэрэнгүй:</p>
          <p className="border-b-2 pb-4"> {showTable[0].table_email},{" "} 
            {showTable[0].table_number} ширээ, {showTable[0].table_date},{" "}
            {showTable[0].table_time}, {showTable[0].table_people} зочин
          </p>
          <button
            onClick={handleOpen}
            className="mt-5   border-2 border-gray-300  hover:border-white hover:bg-white hover:text-black focus:outline-none text-whitefocus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 "
          >
            Цуцлах
          </button>
        </div>
        <div className="border-2  grid grid-cols-2 ">
          <div className="md:col-span-1 col-span-2 p-8">
            <p>
              Хаяг: <br />
              Улаанбаатар <br /> Улаанбаатар, Монгол улс
            </p>
          </div>
          <div className="md:col-span-1 col-span-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10696.455222449256!2d106.92076028772159!3d47.914835371338675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969250b4dca6f5%3A0x458d53bf252ffc5c!2sPeace%20Tower%2C%20Ulaanbaatar!5e0!3m2!1sen!2smn!4v1633434386176!5m2!1sen!2smn"
              width="100%"
              loading="lazy"
            />
          </div>
        </div>
        <h1 className="text-center">
          Бидэнтэй утсаар холбогдох: +976 9988 2655.
        </h1>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="text-center font-light text-white">
          <h1 className="text-center text-3xl ">Та захиалгаа цуцлах уу?</h1>
          <div className="mt-4 text-start ps-14 ">
            <label>Мэйл хаяг баталгаажуулна уу</label>
            <input
              value={inputValue}
              type="email"
              className="bg-black border mt-1 px-2 py-0.5"
              onChange={handleInput}
            />
            {showValidation ? (
              <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                <span className="font-medium">Мэйл хаяг</span> буруу байна.
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="flex gap-2 justify-end mt-10 ">
            <button
              onClick={handleDelete}
              className="bg-black text-white  border-2 border-gray-300 text-sm  block px-2.5 py-1  hover:border-white hover:bg-white hover:text-black"
            >
              Тийм
            </button>
            <button
              onClick={handleClose}
              className="bg-black text-white  border-2 border-gray-300 text-sm  block px-2.5 py-1  hover:border-white hover:bg-white hover:text-black"
            >
              Үгүй
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
