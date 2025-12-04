import {
  Box,
  Center,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  useToast,
} from "@chakra-ui/react";
import CartItemsContext from "../../../context/CartItemsProvider";
import CartTotalContext from "../../../context/CartTotalProvider";
import { useContext, useState } from "react";

export default function ItemCard(props) {

  let id = 0;
  let price = 0;
  let quantity = 0;
  let image_link = '';
  let name = '';
  let note = '';
  if (props.item != undefined) {
    id = props.item._id;
    price = props.item.price;
    image_link = props.item.image_link;
    name = props.item.name;
    note = props.item.note;
  }

  const [cartTotal, setCartTotal] = useContext(CartTotalContext);
  const [cartItems, setCartItems] = useContext(CartItemsContext);

  if (cartItems[id] != undefined)
    quantity = cartItems[id].quantity;

  let cartItemsIds = Object.keys(cartItems);
  const toast = useToast();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const addItem = (item) => {
    if (1000000 < cartTotal + price) {
      toast({
        title: "Insufficent Funds",
        description: "You do not have enough money for this item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    let alreadyAdded = false;
    for (let i = 0; i < cartItemsIds.length; i++) {
      if (item._id == cartItemsIds[i]) {
        alreadyAdded = true;
        let copyCartItems = { ...cartItems };
        copyCartItems[id].quantity += 1;
        setCartItems(copyCartItems);
        setCartTotal(cartTotal + price);
        return;
      }
    }

    if (!alreadyAdded) {
      let copyCartItems = { ...cartItems };
      copyCartItems[id] = { item: item, quantity: 1, price: price };
      setCartItems(copyCartItems);
      setCartTotal(cartTotal + item.price);
    }
  };

  const IMAGE =
    "https://il.farnell.com/productimages/large/en_GB/1775788-40.jpg";
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"160px"}
        height={"280px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
        mr="5"
      >
        <Box
          rounded={"lg"}
          mt={-10}
          pos={"relative"}
          height={"110px"}
          width="110px"
          textAlign="center"
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 0,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(5px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(15px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={"110px"}
            width="110px"
            // width={"auto"}
            objectFit={"cover"}
            src={image_link}
          />
        </Box>

        <Stack mt={6} align={"center"} w="110px" h="auto" textAlign="center">
          <Heading
            fontSize={"16"}
            w="full"
            h="35px"
            fontFamily={"body"}
            fontWeight={500}
          >
            {name}
          </Heading>
          <Text as="span" color="gray.300" fontSize="11">
            {" "}
            {note}
          </Text>
          <Text fontWeight={800} fontSize={"20"} color="green.400">
            {formatter.format(price).slice(0, -3)}
          </Text>
          <Button
            mb={6}
            colorScheme="blue"
            onClick={function () {
              addItem(props.item);
            }}
            position="absolute"
            bottom="15px"
          >
            {" "}
            Add to cart{" "}
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
