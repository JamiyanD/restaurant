import { createContext, useState,ReactNode } from "react";

// interface IShowTable {
//   _id: string;
//   table_number: string;
//   table_date: string;
//   table_time: string;
//   table_people: string;
// }

// interface TableContextType {

//   _id: string;
//   table_number: string;
//   table_date: string;
//   table_time: string;
//   table_people: string;
// }
interface ITable {
  _id: any;
  table_number: any;
  table_date: any;
  table_time: any;
  table_people: any;
  table_status : any;
}

interface TableContextType {
    
  showTable: ITable[];
  setShowTable: (like: any) => void;
}

const TableContext = createContext<TableContextType>({} as TableContextType);

interface AppProviderProps{
  children : ReactNode;
}

const TableProvider = ({ children }: AppProviderProps) => {
  const [showTable, setShowTable] = useState([{
    _id: "",
    table_number: "",
    table_date: "",
    table_time: "",
    table_people: "",
    table_status: ""
  }]);
  return (
    <TableContext.Provider value={{ showTable, setShowTable }}>
      {children}
    </TableContext.Provider>
  );
};

export { TableContext, TableProvider };
