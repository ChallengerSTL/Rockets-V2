import {
  Heading,
  Input,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  Wrap,
  WrapItem,
  Box
} from "@chakra-ui/react";


import ItemCard from "./ItemCard";
// import Navbar from "./Navbar";
// import CartItem from "./CartItem";
export default function Category(props) {

  let itemList = [];
  if (props.items != undefined) {
    itemList = props.items;
  }

  let margin_top = "20px";
  if (props.category == 'Launch Port Rentals')
    margin_top = "100px";
  return (
    <Box mt={margin_top} pt="10px" borderTop='1px' borderColor='gray.350'>
      <Heading as="h2" fontSize="2rem" noOfLines={1}>
        {props.category}
      </Heading>
      <Wrap>
        {itemList.map((item) => (
          <WrapItem key={item._id}>
            <ItemCard item={item}> </ItemCard>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}
