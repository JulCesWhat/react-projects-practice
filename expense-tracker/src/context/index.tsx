import React, { createContext } from "react";

export interface IFormData {
  type: string;
  amount: number;
  description: string;
  id?: number;
}

interface IGlobalContext {
  formData: IFormData;
  setFormData: (data: IFormData) => void;
  value: string;
  setValue: (value: string) => void;
  totalExpense: number;
  setTotalExpense: (val: number) => void;
  totalIncome: number;
  setTotalIncome: (val: number) => void;
  allTransactions: IFormData[];
  setAllTransactions: (val: IFormData[]) => void;
  handleFormSubmit: (newFormData: IFormData) => void;
}

export const GlobalContext = createContext<IGlobalContext>({
  formData: {
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
  setAllTransactions: (val: IFormData[]) => {},
  handleFormSubmit: (newFormData: IFormData) => {},
});

interface IGlobalContextProviderProps {
  children: React.ReactNode;
}

const GlobalContextProvider = ({ children }: IGlobalContextProviderProps) => {
  const [formData, setFormData] = React.useState({
    type: "income",
    amount: 0,
    description: "",
  });

  const [value, setValue] = React.useState("expense");
  const [totalExpense, setTotalExpense] = React.useState(0);
  const [totalIncome, setTotalIncome] = React.useState(0);
  const [allTransactions, setAllTransactions] = React.useState<IFormData[]>([]);

  const handleFormSubmit = (newFormData: IFormData) => {
    if (!newFormData.description || !newFormData.amount) return;
    // setFormData(newFormData);
    setAllTransactions([
      ...allTransactions,
      { ...newFormData, id: Date.now() },
    ]);
  };

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        value,
        setValue,
        totalExpense,
        setTotalExpense,
        totalIncome,
        setTotalIncome,
        allTransactions,
        setAllTransactions,
        handleFormSubmit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
