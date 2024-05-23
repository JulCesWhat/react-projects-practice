import {
  FormControl,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

interface IAddTransactionProps {
  onClose: () => void;
  isOpen: boolean;
}

const AddTransaction = (props: IAddTransactionProps) => {
  return (
    <Modal {...props}>
      <form>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Description</FormLabel>
              <Input
                type="text"
                name="description"
                placeholder="Enter transaction description"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter Amount</FormLabel>
              <Input
                type="number"
                name="amount"
                placeholder="Enter transaction amount"
              />
            </FormControl>
            <RadioGroup mt={"5"}>
              <Radio color={"blue"} value="income" name="type">
                Income
              </Radio>
              <Radio color={"red"} value="expense" name="type">
                Expense
              </Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button mr={"4"}>Cancel</Button>
            <Button>Add</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddTransaction;
