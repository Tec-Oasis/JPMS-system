import React, { createContext, useContext, useState, ReactNode } from "react";

type DirectionContextType = {
  direction: "ltr" | "rtl";
  setDirection: (dir: "ltr" | "rtl") => void;
};

const DirectionContext = createContext<DirectionContextType | undefined>(
  undefined
);

export const DirectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  const contextValue: DirectionContextType = {
    direction,
    setDirection,
  };

  return (
    <DirectionContext.Provider value={contextValue}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirection = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
};
