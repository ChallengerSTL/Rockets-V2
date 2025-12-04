import {
  Flex,
  Heading,
  Input,
  Button,
  Grid,
  GridItem,
  useColorMode,
  useColorModeValue,
  Wrap,
  WrapItem,
  Box,
  Progress,
  Text,
} from "@chakra-ui/react";

import ItemCard from "./components/mainView/ItemCard";
import Navbar from "./components/Navbar";
import CartItem from "./components/mainView/CartItem";
import Category from "./components/mainView/Category";
import BudgetBar from "./components/mainView/BudgetBar";
import Cart from "./components/mainView/Cart";
import clientPromise from "../lib/mongodb";

import { useContext, useState } from "react";
import { setCookie, getCookie, hasCookie } from 'cookies-next';
import CartTotalContext from "../context/CartTotalProvider";
import CartItemsContext from "../context/CartItemsProvider";
import ApprovedItemsContext from "../context/ApprovedItemsProvider";
import { useEffect } from 'react';

function Home({ items, admin_code }) {
  // check for cookies
  const [cartTotal, setCartTotal] = useContext(CartTotalContext);
  const [cartItems, setCartItems] = useContext(CartItemsContext);
  const [approvedItems, setApprovedItems] = useContext(ApprovedItemsContext);

  useEffect(() => {
  if (hasCookie('cartTotal')) {
    let cookie_cartTotal = parseInt(getCookie('cartTotal'));
    setCartTotal(cookie_cartTotal, false);
  };
  if (hasCookie('cartItems')) {
    let cookie_cartItems = JSON.parse(getCookie('cartItems'));
    setCartItems(cookie_cartItems, false);
  };
  if (hasCookie('approvedItems')) {
    let cookie_approvedItems = JSON.parse(getCookie('approvedItems'));
    setApprovedItems(cookie_approvedItems, false);
  };
}, []);

  const formBackground = useColorModeValue("gray.700");

  let items_dict = {
    "Launch Port Rentals": [],
    "Delta Pneumatics®": [],
    "Intergalactic Paper Products®": [],
    "Stellar Adhesives®": [],
    "Mass Dynamics®": [],
    "Soaring Rocket Parts Plus®": [],
    "Your Commander": [],
  };
  for (let i = 0; i < items.length; i++) {
    items_dict[items[i].subcontractor].push(items[i]);
  }
  let categories = [
    "Launch Port Rentals",
    "Delta Pneumatics®",
    "Intergalactic Paper Products®",
    "Stellar Adhesives®",
    "Mass Dynamics®",
    "Soaring Rocket Parts Plus®",
    "Your Commander",
  ];

  return (
    <Box width="100%" position="relative">
      <Navbar />
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={3} width="100%">
          <Box width="100%" margin="10">
            {categories.map((cat) => (
              <Category key={cat} items={items_dict[cat]} category={cat} />
            ))}
          </Box>
        </GridItem>

        <GridItem
          colStart={4}
          colEnd={6}
          float="right"
          height="100vh"
          top="0"
        >
        </GridItem>
      </Grid>

      <Box
        width="400px"
        padding="5"
        float="right"
        position="fixed"
        top={0}
        right={0}
        height="100vh"
        zIndex={10}
        backgroundColor={"#1b2235"}
        borderLeft="1px solid black"
      >
        <BudgetBar />
        <Cart admin_code={admin_code}/>
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = client.db("main");

  const items = await db.collection("items").find({}).toArray();
  const admin_code = await db.collection("code").find({}).toArray();

  return {
    props: { items: JSON.parse(JSON.stringify(items)), admin_code: JSON.parse(JSON.stringify(admin_code))[0]['admin_code']},
  };
}

export default Home;
