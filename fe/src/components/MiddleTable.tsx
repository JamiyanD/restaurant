import styles from "@/styles/tableData.module.css";
import * as React from "react";
import ClickOnTable from "./ClickOnTable";
import { useContext, useState, useEffect } from "react";
import { TableContext } from "@/context/TableContext";

export default function MiddleTable() {
  const { showTable } = useContext(TableContext);
  const [sixthTable, setSixthTable] = useState(true);
  const [seventhTable, setSeventhTable] = useState(true);
  const [eighthTable, setEighthTable] = useState(true);
  const [ninthTable, setNinthTable] = useState(true);

  useEffect(() => {
    showTable.map((t) => {  
      if (t.table_people >= 5 && t.table_people <= 7) {
        setSixthTable(false);
        setSeventhTable(false);
        setEighthTable(false);
        setNinthTable(false);
      } else {
        setSixthTable(true);
        setSeventhTable(true);
        setEighthTable(true);
        setNinthTable(true);
      }
    });

    showTable.map((t) => {
      if (t.table_people >= 5 && t.table_people <= 7) {
        setSixthTable(false);
        setSeventhTable(false);
        setEighthTable(false);
        setNinthTable(false);
      }
    });

    showTable.map((t) => {
      if (t.table_people >= 5 && t.table_people <= 7) {
        switch (t.table_number) {
          case "6":
            setSixthTable(true);
            break;
          case "7":
            setSeventhTable(true);
            break;
          case "8":
            setEighthTable(true);
            break;
          case "9":
            setNinthTable(true);
            break;
        }
      }
    });
  });
  return (
    <div>
      <div
        className={`${styles.middleTable} ${
          sixthTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        } ${styles.table6}`}
      >
        {sixthTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={6} numberOfTable={6} />
        )}
        <div className={`${styles.middleChair1} ${styles.middle}`}/>
        <div className={`${styles.middleChair2} ${styles.middle}`}/>
        <div className={`${styles.middleChair3} ${styles.middle}`}/>
        <div className={`${styles.middleChair4} ${styles.middle}`}/>
        <div className={`${styles.middleChair5} ${styles.middle}`}/>
        <div className={`${styles.middleChair6} ${styles.middle}`}/>
      </div>
      <div
        className={`${styles.middleTable} ${
          seventhTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        } ${styles.table7}`}
      >
        {seventhTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={6} numberOfTable={7} />
        )}
        <div className={`${styles.middleChair1} ${styles.middle}`}/>
        <div className={`${styles.middleChair2} ${styles.middle}`}/>
        <div className={`${styles.middleChair3} ${styles.middle}`}/>
        <div className={`${styles.middleChair4} ${styles.middle}`}/>
        <div className={`${styles.middleChair5} ${styles.middle}`}/>
        <div className={`${styles.middleChair6} ${styles.middle}`}/>
      </div>
      <div
        className={`${styles.middleTable} ${
          eighthTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        } ${styles.table8}`}
      >
        {eighthTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={6} numberOfTable={8} />
        )}
        <div className={`${styles.middleChair1} ${styles.middle}`}/>
        <div className={`${styles.middleChair2} ${styles.middle}`}/>
        <div className={`${styles.middleChair3} ${styles.middle}`}/>
        <div className={`${styles.middleChair4} ${styles.middle}`}/>
        <div className={`${styles.middleChair5} ${styles.middle}`}/>
        <div className={`${styles.middleChair6} ${styles.middle}`}/>
      </div>
      <div
        className={`${styles.middleTable} ${
          ninthTable
            ? "bg-gray-200"
            : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
        } ${styles.table9}`}
      >
        {ninthTable ? (
          ""
        ) : (
          <ClickOnTable numberOfChairs={6} numberOfTable={9} />
        )}
        <div className={`${styles.middleChair1} ${styles.middle}`}/>
        <div className={`${styles.middleChair2} ${styles.middle}`}/>
        <div className={`${styles.middleChair3} ${styles.middle}`}/>
        <div className={`${styles.middleChair4} ${styles.middle}`}/>
        <div className={`${styles.middleChair5} ${styles.middle}`}/>
        <div className={`${styles.middleChair6} ${styles.middle}`}/>
      </div>
    </div>
  );
}
