import styles from "@/styles/tableData.module.css";
import * as React from "react";
import ClickOnTable from "./ClickOnTable";
import { useContext, useState, useEffect } from "react";
import { TableContext } from "@/context/TableContext";



export default function BigTable() {
  const { showTable }  = useContext(TableContext);
  const [twelveTable, setTwelveTable] = useState(true);
  const [thirteenthTable, setThirteenthTable] = useState(true);

  useEffect(() => {
    showTable.map((t) => {
      if (t.table_people >= 8 && t.table_people <= 10) {
        setTwelveTable(false);
        setThirteenthTable(false);
      } else {
        setTwelveTable(true);
        setThirteenthTable(true);
      }
    });
    showTable.map((t) => {
      if (t.table_people >= 8 && t.table_people <= 10) {
        setTwelveTable(false);
        setThirteenthTable(false);
      }
    });

    showTable.map((t) => {
      if (t.table_people >= 8 && t.table_people <= 10) {
        switch (t.table_number) {
          case "12":
            setTwelveTable(true);
            break;
          case "13":
            setThirteenthTable(true);
            break;
        }
      }
    });
  });
  return (
    <div>
      <div
        className={` ${styles.bigTable} ${
          twelveTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        }  ${styles.table12}`}
      >
        {twelveTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={10} numberOfTable={12} />
        )}
        <div className={`${styles.bigChair1} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair2} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair3} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair4} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair5} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair6} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair7} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair8} ${styles.big}`}>{""}</div>
      </div>
      <div
        className={` ${styles.bigTable} ${
          thirteenthTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        }  ${styles.table13}`}
      >
        {thirteenthTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={10} numberOfTable={13} />
        )}
        <div className={`${styles.bigChair1} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair2} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair3} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair4} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair5} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair6} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair7} ${styles.big}`}>{""}</div>
        <div className={`${styles.bigChair8} ${styles.big}`}>{""}</div>
      </div>
    </div>
  );
}
