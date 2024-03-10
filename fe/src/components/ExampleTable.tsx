import styles from "@/styles/tableData.module.css";
import * as React from "react";

interface Props {
  tableSize: string;
}
export default function ExampleTable({ tableSize }: Props) {
  return (
    <div className={` ${tableSize}`}>
      <div className={`${styles.smallChair1} ${styles.small}`}/>
      <div className={`${styles.smallChair2} ${styles.small}`}/>
      <div className={`${styles.smallChair3} ${styles.small}`}/>
      <div className={`${styles.smallChair4} ${styles.small}`}/>
    </div>
  );
}
