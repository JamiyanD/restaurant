import React from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import styles from "@/styles/tableData.module.css";
import { useContext } from "react";
import { TableContext } from "@/context/TableContext";
import { useRouter } from "next/router";

interface MyComponentProps {
  numberOfChairs: number;
  numberOfTable: number;
}

export default function ClickOnTable({
  numberOfChairs,
  numberOfTable,
}: MyComponentProps) {
  const { showTable, setShowTable } = useContext(TableContext);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(showTable)
  function handleOrder() {
    router.push("/BookingTableCreateLogin");
    const newOrder = {
      table_number: numberOfTable,
      table_email: "jaya@gmail.com",
      table_people: showTable[0].table_people,
      table_date: showTable[0].table_date,
      table_time: showTable[0].table_time,
    };
    setShowTable([newOrder, ...showTable]);
    handleClose();
  }
  return (
    <div className="bg-black ">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className={styles.smallTableButton}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        className=""
      >
        <div className="mx-2  flex flex-col gap-3 content-center">
          <div className="bg-gray-200 text-center p-1 rounded text-sm text-gray-700">
            Ширээ
          </div>

          <div className="flex justify-between gap-4">
            <p className="text-xs text-gray-500">Cуудлын тоо</p>
            <p className="text-xs font-bold">{numberOfChairs}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-500">Ширээ</p>
            <p className="text-xs font-bold">{numberOfTable}</p>
          </div>
          <button
            onClick={() => void handleOrder()}
            className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm p-1 mb-2 flex justify-center"
          >
            Захиалах
          </button>
        </div>
      </Menu>
    </div>
  );
}
