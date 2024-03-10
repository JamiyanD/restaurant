import { OrderProvider } from "@/context/OrderCheckContext";
import { TableProvider } from "@/context/TableContext";
import { TablesContextProvider } from "@/context/TablesContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OrderProvider>
      <TablesContextProvider>
        <TableProvider>
          <Component {...pageProps} />
        </TableProvider>
      </TablesContextProvider>
    </OrderProvider>
  );
}
