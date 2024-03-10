import React, { createContext, useState } from 'react';

type TablesContextType = {
    tableId: string;
    getTableId: string;
    updategetTableId: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTable: () => void;
};

export const TablesContext = createContext<TablesContextType | undefined>(undefined);

type TablesContextProviderProps = {
    children: React.ReactNode;
};

export const TablesContextProvider: React.FC<TablesContextProviderProps> = ({ children }) => {
    const URL_TABLE = `${process.env.BACKEND_URL}/tables/table`
    const [tableId, setTableId] = useState('');
    const [getTableId, setGetTableId] = useState('');

    const updategetTableId = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setGetTableId(e.target.value);
        console.log('shiree Number', getTableId);
    };

    const handleTable = async () => {
        const tableNumber = getTableId;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableNumber: tableNumber }),
        };

        const FETCHED_DATA = await fetch(URL_TABLE, options);
        const FETCHED_JSON = await FETCHED_DATA.json();
        console.log('ID', FETCHED_JSON);
        setTableId(FETCHED_JSON);
    };

    return (
        <TablesContext.Provider
            value={{
                tableId,
                getTableId,
                updategetTableId,
                handleTable,
            }}
        >
            {children}
        </TablesContext.Provider>
    );
};
