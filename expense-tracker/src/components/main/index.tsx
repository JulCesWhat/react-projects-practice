import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import ExpenseView from "../expense-view";
import Summary from "../summay";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";

const Main = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    totalExpense,
    setTotalExpense,
    totalIncome,
    setTotalIncome,
    allTransactions,
  } = useContext(GlobalContext);

  useEffect(() => {
    let totalExp = 0;
    let totalInc = 0;
    allTransactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        totalExp += parseFloat(transaction?.amount?.toString());
      } else {
        totalInc += parseFloat(transaction?.amount?.toString());
      }
    });
    setTotalExpense(totalExp);
    setTotalIncome(totalInc);
  }, [allTransactions, setTotalExpense, setTotalIncome]);

  return (
    <Flex textAlign={"center"} flexDirection={"column"} pr={"5"} pl={"5"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} mt={"12"}>
        <Heading
          color={"blue.400"}
          display={["none", "block", "block", "block", "block"]}
        >
          Expense Tracker
        </Heading>
        <Flex alignItems={"center"}>
          <Button onClick={onOpen} bg={"blue.300"} color={"black"} ml={"4"}>
            Add New Transaction
          </Button>
        </Flex>
      </Flex>
      <Summary
        isOpen={isOpen}
        onClose={onClose}
        totalExpense={totalExpense}
        totalIncome={totalIncome}
      />
      <Flex
        w={"full"}
        alignItems={"flex-start"}
        justifyContent={"space-evenly"}
        flexDirection={["column", "column", "column", "row", "row"]}
      >
        <ExpenseView />
        <ExpenseView />
      </Flex>
    </Flex>
  );
};

export default Main;
