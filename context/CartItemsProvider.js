import { createContext, useState } from 'react';

const CartItemsContext = createContext();

export const CartItemsProvider = ({ children }) => {
  // In-memory only — clears on refresh or closing the website
  const [cartItems, setCartItems] = useState({});

  return (
    <CartItemsContext.Provider value={[cartItems, setCartItems]}>
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsContext;
