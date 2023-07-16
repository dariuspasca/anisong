import * as React from "react";

interface MenuContextProps {
  toggle: boolean;
  toggleFunction: (toggle: boolean) => void;
}

export const MenuContext = React.createContext<MenuContextProps>({
  toggle: false,
  toggleFunction: () => void {},
});

interface MenuProviderProps {
  children?: React.ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [toggle, setToggle] = React.useState(false);
  const toggleFunction = () => {
    setToggle(!toggle);
  };

  return (
    <MenuContext.Provider value={{ toggle, toggleFunction }}>
      {children}
    </MenuContext.Provider>
  );
};
