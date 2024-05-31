import React, { createContext } from "react";

interface IFormData {
  type: string;
  amount: number;
  description: string;
}

interface IGlobalContext {
  fromData: IFormData;
  setFormData: (data: IFormData) => void;
  value: string;
  setValue: (value: string) => void;
  totalExpense: number;
  setTotalExpense: (val: number) => void;
  totalIncome: number;
  setTotalIncome: (val: number) => void;
  allTransactions: string[];
  setAllTransactions: (val: string[]) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
  fromData: {
    type: "expense",
    amount: 0,
    description: "",
  },
  setFormData: (data: IFormData) => {},
  value: "expense",
  setValue: (value: string) => {},
  totalExpense: 0,
  setTotalExpense: (val: number) => {},
  totalIncome: 0,
  setTotalIncome: (val: number) => {},
  allTransactions: [],
  setAllTransactions: (val: string[]) => {},
});

interface IGlobalContextProviderProps {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: IGlobalContextProviderProps) => {
  const [fromData, setFormData] = React.useState({
    type: "expense",
    amount: 0,
    description: "",
  });

  const [value, setValue] = React.useState("expense");
  const [totalExpense, setTotalExpense] = React.useState(0);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [allTransactions, setAllTransactions] = React.useState<string[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        fromData,
        setFormData,
        value,
        setValue,
        totalExpense,
        setTotalExpense,
        totalIncome,
        setTotalIncome,
        allTransactions,
        setAllTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
