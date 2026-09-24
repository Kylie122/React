import { Stack } from "expo-router";
import { createContext, useContext, useState } from "react";

// Storage
const MoneyContext = createContext<any>(null);


export function MoneyProvider({ children }: any) {

  // Player kwarta
  const [money, setMoney] = useState(1000);

  return (
    <MoneyContext.Provider value={{ money, setMoney }}>
      {children}
    </MoneyContext.Provider>
  );
}


export function useMoney() {
  return useContext(MoneyContext);
}


export default function Layout() {
  return (
    <MoneyProvider>
      <Stack />
    </MoneyProvider>
  );
}