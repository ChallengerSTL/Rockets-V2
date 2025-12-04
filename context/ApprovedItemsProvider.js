import { createContext, useState } from 'react';

const ApprovedItemsContext = createContext();

export const ApprovedItemsProvider = ({ children }) => {
  // in-memory only; resets on refresh or close
  const [approvedItems, setApprovedItems] = useState({});

  return (
    <ApprovedItemsContext.Provider value={[approvedItems, setApprovedItems]}>
      {children}
    </ApprovedItemsContext.Provider>
  );
};

export default ApprovedItemsContext;
