import styles from "@/styles/tableData.module.css";
import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { TableContext } from "@/context/TableContext";
import ClickOnTable from "./ClickOnTable";

export default function SmallTable() {
  const { showTable } = useContext(TableContext);
  const [firstTable, setFirstTable] = useState(true);
  const [secondTable, setSecondTable] = useState(true);
  const [thirdTable, setThirdTable] = useState(true);
  const [fourthTable, setFourthTable] = useState(true);
  const [fifthTable, setFifthTable] = useState(true);
  const [tenthTable, setTenthTable] = useState(true);
  const [eleventhTable, setEleventhTable] = useState(true);

  useEffect(() => {
    showTable.map((t) => {
        if (t.table_people <= 4) {
          setFirstTable(false);
          setSecondTable(false);
          setThirdTable(false);
          setFourthTable(false);
          setFifthTable(false);
          setTenthTable(false);
          setEleventhTable(false);
        } else {
          setFirstTable(true);
          setSecondTable(true);
          setThirdTable(true);
          setFourthTable(true);
          setFifthTable(true);
          setTenthTable(true);
          setEleventhTable(true);
        }}
    );
    showTable.map((t) => {
      switch (t.table_number) {
        case "1":
          setFirstTable(true);
          break;
        case "2":
          setSecondTable(true);
          break;
        case "3":
          setThirdTable(true);
          break;
        case "4":
          setFourthTable(true);
          break;
        case "5":
          setFifthTable(true);
          break;
        case "10":
          setTenthTable(true);
          break;
        case "11":
          setEleventhTable(true);
          break;
      }
    });
  });
  return (
    <div>
      <div
        className={`${styles.table1} ${styles.smallTable} ${
          firstTable
            ? "bg-gray-200 "
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600 "
        }`}
      >
        {firstTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={4} numberOfTable={1} />
        )}

        <div className={`${styles.smallChair1} ${styles.small}`} />
        <div className={`${styles.smallChair2} ${styles.small}`} />
        <div className={`${styles.smallChair3} ${styles.small}`} />
        <div className={`${styles.smallChair4} ${styles.small}`} />
      </div>
      <div
        className={`${styles.table2} ${styles.smallTable} ${
          secondTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        }`}
      >
        {secondTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={4} numberOfTable={2} />
        )}
        <div className={`${styles.smallChair1} ${styles.small}`} />
        <div className={`${styles.smallChair2} ${styles.small}`} />
        <div className={`${styles.smallChair3} ${styles.small}`} />
        <div className={`${styles.smallChair4} ${styles.small}`} />
      </div>
      <div
        className={`${styles.table3} ${styles.smallTable} ${
          thirdTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        }`}
      >
        {thirdTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={4} numberOfTable={3} />
        )}
        <div className={`${styles.smallChair1} ${styles.small} `} />
        <div className={`${styles.smallChair2} ${styles.small}`} />
        <div className={`${styles.smallChair3} ${styles.small}`} />
        <div className={`${styles.smallChair4} ${styles.small}`} />
      </div>
      <div
        className={`${styles.table4} ${styles.smallTable} ${
          fourthTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        }`}
      >
        {fourthTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={4} numberOfTable={4} />
        )}
        <div className={`${styles.smallChair1} ${styles.small}`} />
        <div className={`${styles.smallChair2} ${styles.small}`} />
        <div className={`${styles.smallChair3} ${styles.small}`} />
        <div className={`${styles.smallChair4} ${styles.small}`} />
      </div>
      <div
        className={`${styles.table5} ${styles.smallTable} ${
          fifthTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        }`}
      >
        {fifthTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={4} numberOfTable={5} />
        )}
        <div className={`${styles.smallChair1} ${styles.small}`} />
        <div className={`${styles.smallChair2} ${styles.small}`} />
        <div className={`${styles.smallChair3} ${styles.small}`} />
        <div className={`${styles.smallChair4} ${styles.small}`} />
      </div>
      <div
        className={`${styles.table10} ${styles.smallTable} ${
          tenthTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        }`}
      >
        {tenthTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={4} numberOfTable={10} />
        )}
        <div className={`${styles.smallChair1} ${styles.small}`} />
        <div className={`${styles.smallChair2} ${styles.small}`} />
        <div className={`${styles.smallChair3} ${styles.small}`} />
        <div className={`${styles.smallChair4} ${styles.small}`} />
      </div>
      <div
        className={`${styles.table11} ${styles.smallTable} ${
          eleventhTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        }`}
      >
        {eleventhTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={4} numberOfTable={11} />
        )}
        <div className={`${styles.smallChair1} ${styles.small}`} />
        <div className={`${styles.smallChair2} ${styles.small}`} />
        <div className={`${styles.smallChair3} ${styles.small}`} />
        <div className={`${styles.smallChair4} ${styles.small}`} />
      </div>
    </div>
  );
}
