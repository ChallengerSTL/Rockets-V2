import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

import CartTotalContext from "../../../context/CartTotalProvider";
import CartItemsContext from "../../../context/CartItemsProvider";
import { useContext, useState, useRef } from "react";
import CartItem from "./CartItem";
import ApprovedItem from "./ApprovedItems";
import ApprovedItemsContext from "../../../context/ApprovedItemsProvider";

export default function Cart(props) {
  const [cartTotal, setCartTotal, approvedCartTotal, setApprovedCartTotal, unapprovedCartTotal, setUnapprovedCartTotal] = useContext(CartTotalContext);
  const [cartItems, setCartItems] = useContext(CartItemsContext);
  const [approvedItems, setApprovedItems] = useContext(ApprovedItemsContext);

  let cartItemsIds = Object.keys(cartItems);
  let approvedItemsIds = Object.keys(approvedItems);

  const [password, setPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();
  function display_toast(title, description, status) {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  let cartLen = cartItemsIds.length;

  let showCart = "none";
  let showApprove = "none";
  if (cartLen > 0) {
    showCart = "show";
  }
  if (approvedItemsIds.length > 0) {
    showApprove = "show";
  }
  let showSaveButton = "none";
  let showEditButton = showApprove;
  if (editMode) {
    showSaveButton="show";
    showEditButton="none";
  }



  const approve_input_field = useRef();
  const edit_input_field = useRef();

  function showIncorrectPasswordToast() {
    display_toast("Wrong code entered!", "Please check your syntax", "error");
  }

  async function checkPassword(tabPannel) {
    if (tabPannel == "Approve") {
      if (password == props.admin_code) {
        let copyApprovedItems = { ...approvedItems };
        for (let i = 0; i < cartItemsIds.length; i++) {
          let cur_id = cartItemsIds[i];
          if (cartItems[cur_id].quantity==0) {
            continue;
          }
          if (approvedItemsIds.includes(cur_id)) {
            copyApprovedItems[cur_id].quantity += cartItems[cur_id].quantity;
          }
          else copyApprovedItems[cur_id] = { ...cartItems[cur_id] };
        }
        setApprovedItems(copyApprovedItems);
        setCartItems({});
        setEditMode(false);
        setPassword('');
        setApprovedCartTotal(cartTotal);
        setUnapprovedCartTotal(0);
      await fetch("/api/submitRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team: "North Falcons",    
          items: cartItems,
          total: cartTotal,
          timestamp: new Date()
        })
      });









        display_toast("Success!", "Items in cart were approved.", "success")
      }
      else {
        showIncorrectPasswordToast();
      }
      approve_input_field.current.value = "";

    } else if (tabPannel == "Edit") {
      if (password == props.admin_code) {
        setEditMode(true);
        setPassword('');
      }
      else {
        showIncorrectPasswordToast();
      }
      edit_input_field.current.value = "";
    }
  }

  function saveApproved() {
    setEditMode(false);
    display_toast("Success!", "Approved items were edited", "success");
    for (let i = 0; i < approvedItemsIds.length; i++) {
      let cur_id = approvedItemsIds[i];
      if (approvedItems[cur_id].quantity == 0)
        delete approvedItems[cur_id];
    }
  }

  return (
    <Tabs variant="enclosed" fontWeight="bold">
      <TabList>
        <Tab>Cart</Tab>
        <Tab>Approved</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box
            width="400px"
            margin="auto"
            overflow="auto"
            maxHeight="calc(100vh - 350px)"
            justifyContent="center"
            sx={{
              "&::-webkit-scrollbar": {
                display: "visible",
                width: "8px",
                borderRadius: "2px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
          >
            {cartItemsIds.map((item_id) => (
              <CartItem key={item_id} item={cartItems[item_id].item} />
            ))}
          </Box>

          <Flex width="95%" mt="3">
            <Input
              type="password"
              width="80%"
              pr="5"
              placeholder="Enter code"
              required
              display={showCart}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              float="left"
              ref={approve_input_field}
            />
            <Box display={showCart} pl="5">
              <Button
                size="md"
                colorScheme="blue"
                onClick={function () {
                  checkPassword("Approve");
                }}
              >
                Approve
              </Button>
            </Box>
          </Flex>

        </TabPanel>
        <TabPanel>
        <Box
            width="400px"
            height="auto"
            margin="auto"
            overflowY="scroll"
            scrollbar="none"
            maxHeight="calc(100vh - 350px)"
            sx={{
              "&::-webkit-scrollbar": {
                display: "visible",
                width: "8px",
                borderRadius: "2px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
          >
            {approvedItemsIds.map((item_id) => (
              <ApprovedItem key={item_id}
                item={approvedItems[item_id].item}
                editMode={editMode}
              />
            ))}
          </Box>

          <Flex width="95%" mt="3">
            <Input
              type="password"
              width="80%"
              pr="5"
              placeholder="Enter code"
              required
              display={showEditButton}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              ref = {edit_input_field}
            />

            <Box display={showEditButton}>
              <Button
                size="md"
                pr="8"
                ml="2"
                pl="8" mr="2"
                colorScheme="orange"
                onClick={function () {
                  checkPassword("Edit");
                }}
              >
                Edit
              </Button>
            </Box>
            <Box display={showSaveButton} margin="auto">
              <Button
                size="md"
                pr="8"
                pl="8"
                colorScheme="blue"
                onClick={saveApproved}
              >
                Save
              </Button>
            </Box>
          </Flex>

        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
