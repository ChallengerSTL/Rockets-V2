import * as React from "react";
import {useEffect, useRef} from 'react';
import {
  Box,
  Flex,
  HStack,
  chakra,
  Input,
  Spacer,
  Grid,
  GridItem,
  Image,
  Heading,
  Stack,
  Text,
  Link,
  Select,
  SelectProps,
  CloseButton,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import CartTotalContext from "../../../context/CartTotalProvider";
import { useContext, useState } from "react";
import CartItemsContext from "../../../context/CartItemsProvider";

const IMAGE = "https://il.farnell.com/productimages/large/en_GB/1775788-40.jpg";

export default function CartItem(props) {
  const [cartTotal, setCartTotal, approvedCartTotal, setApprovedCartTotal, unapprovedCartTotal, setUnapprovedCartTotal] = useContext(CartTotalContext);
  const [cartItems, setCartItems] = useContext(CartItemsContext);

  let id = 0;
  let price = 0;
  let quantity = 0;
  let image_link = "";
  let name = "";

  if (props.item != undefined) {
    id = props.item._id;
    price = props.item.price;
    quantity = parseInt(cartItems[props.item._id].quantity);
    image_link = props.item.image_link;
    name = props.item.name;
  }

  let quantity_str = quantity.toString();
  if (quantity_str == '0')
    quantity_str = ''
  let cartItemsIds = Object.keys(cartItems);

  const toast = useToast();
  function display_error_toast(title, description) {
    toast({
      title: title,
      description: description,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  let itemTotal = price * quantity;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function setQuantity(num) {
    let copyCartItems = { ...cartItems };
    copyCartItems[id].quantity = num;
    setCartItems(copyCartItems);
  }

  function increment() {
    if (cartTotal + price > 1000000) {
      display_error_toast("Insufficent Funds", "You do not have enough money for this item");
      return;
    }
    setQuantity(+quantity + 1);
    recalcTotal();
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity(+quantity - 1);
    } else {
      if (quantity == 1){
        setQuantity(0);
      }
      deleteItem(id);
    }
    recalcTotal();
  }

  function deleteItem(item_id) {
    setQuantity(0);
    let copyCartItems = { ...cartItems };
    delete copyCartItems[item_id];
    setCartItems(copyCartItems);
    recalcTotal();
  }


  function getInputQuantity(event){
    let newQuantity = parseInt(event.target.value);
    // Input validation
    if (newQuantity < 0) {
      display_error_toast("Invalid input", "Input must be a number greater than or equal to 0");
      return;
    }
    if(cartTotal + ((newQuantity - quantity) * price) > 1000000){
      display_error_toast("Insufficent Funds", "You do not have enough money for this item");
      return;
    }

    // Set new quantity
    if(newQuantity == "" && quantity != 0){
      setQuantity(0);
      recalcTotal();
      event.target.value = '';
    }
    else if (newQuantity != ""){
      setQuantity(newQuantity);
      recalcTotal();
    }
  }


  function recalcTotal(){ // TODO: approved cart total does not update properly on refresh
    let newCartTotal = 0;
    for (const itemId of Object.keys(cartItems)) {
      const item = cartItems[itemId];
      newCartTotal += item.quantity * item.price;
    }
    setUnapprovedCartTotal(newCartTotal);
    setCartTotal(newCartTotal + approvedCartTotal);
  }

  let show = "show";
  if (cartTotal >= 1000000) {
    show = "none";
  }

  recalcTotal();
  return (
    <Flex
      width="80%"
      height="125px"
      float="left"
      bg={useColorModeValue("white", "gray.900")}
      rounded="lg"
      mb="5"
      justifyContent="space-around"
    >
      <Box display="flex" width="125px" float="left">
        <Image
          rounded={"lg"}
          height={"125px"}
          width={"125px"}
          objectFit={"cover"}
          src={image_link}
        />
      </Box>
      <Stack width="100px" float="left" pl="2">
        <Text as="h4" fontWeight="400">
          {name}
        </Text>
        <Text
          as="span"
          fontSize="12px"
          fontWeight="300"
          color={useColorModeValue("white", "green.300")}
        >
          {formatter.format(price).slice(0, -3)}
          <Text as="span" fontWeight="200" fontSize="12px" color="gray.500">
            /unit
          </Text>
        </Text>
        <Flex m="auto" align="center" position="relative" top="5px">
          <Text pr="1" onClick={decrement} cursor="pointer">
            -
          </Text>

          <Input
            size="sm"
            type="number"
            width="45px"
            rounded="md"
            p="3"
            textAlign="center"
            onChange={getInputQuantity}
            value={quantity_str}
          />
          <Text pl="1" display={show} onClick={increment} cursor="pointer">
            +
          </Text>
        </Flex>
      </Stack>
      <Stack display="flex" width="90px">
        <CloseButton
          position="relative"
          left="55px"
          bottom="0"
          onClick={function () {
            deleteItem(id);
          }}
        />
        <Box
          position="relative"
          top="45px"
          right="5px"
          border="1px solid green"
          rounded="md"
          textAlign="center"
          p="1"
          color={useColorModeValue("white", "green.300")}
        >
          {formatter.format(itemTotal).slice(0, -3)}
        </Box>
      </Stack>
    </Flex>
  );
}
