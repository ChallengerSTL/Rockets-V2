import * as React from "react";
import {
  Flex,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function BudgetRequest({ data, admin_code }) {

  const [password, setPassword] = React.useState("");

  function checkPassword() {
    if (password === admin_code) {
      alert("Approved!");
      // Optional: Add update request status logic here
    } else {
      alert("Wrong code.");
    }
  }

  return (
    <Flex
      width="20%"
      margin="20px"
      height="500px"
      float="left"
      bg={useColorModeValue("white", "gray.900")}
      rounded="lg"
      mb="5"
      justifyContent="center"
      flexDirection="column"
      p="10px"
    >
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Cost</th>
          </tr>
        </thead>

        <tbody>
          {Object.values(data.items).map((item, idx) => (
            <tr key={idx}>
              <td>{item.item.name}</td>
              <td>{item.quantity}x</td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Flex width="95%" mt="auto" justifyContent="space-around" mb="3">
        <Input
          type="password"
          width="50%"
          placeholder="Enter code"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="blue" onClick={checkPassword}>
          Approve
        </Button>
      </Flex>
    </Flex>
  );
}
