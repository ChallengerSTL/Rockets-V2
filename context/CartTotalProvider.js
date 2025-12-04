import { createContext, useState } from 'react';

const CartTotalContext = createContext();

export const CartTotalProvider = ({ children }) => {
  // In-memory only — everything resets on refresh/close
  const [cartTotal, setCartTotal] = useState(0);
  const [approvedCartTotal, setApprovedCartTotal] = useState(0);
  const [unapprovedCartTotal, setUnapprovedCartTotal] = useState(0);

  return (
    <CartTotalContext.Provider
      value={[
        cartTotal,
        setCartTotal,
        approvedCartTotal,
        setApprovedCartTotal,
        unapprovedCartTotal,
        setUnapprovedCartTotal,
      ]}
    >
      {children}
    </CartTotalContext.Provider>
  );
};

export default CartTotalContext;
