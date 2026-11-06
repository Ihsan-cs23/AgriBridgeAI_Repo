import React, { createContext, useContext, useMemo, useState } from 'react';

const FarmerContext = createContext(null);

export function FarmerProvider({ children }) {
  const [profileImageUri, setProfileImageUri] = useState(null);

  const value = useMemo(
    () => ({ profileImageUri, setProfileImageUri }),
    [profileImageUri]
  );

  return (
    <FarmerContext.Provider value={value}>
      {children}
    </FarmerContext.Provider>
  );
}

export function useFarmer() {
  const context = useContext(FarmerContext);

  if (!context) {
    throw new Error('useFarmer must be used inside FarmerProvider');
  }

  return context;
}
