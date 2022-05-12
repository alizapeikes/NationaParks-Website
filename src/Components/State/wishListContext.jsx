import React, { useState } from "react";

export const WishListContext = React.createContext();

export const WishListProvider = (props) => {
  const [wishList, setWishList] = useState([]);
  return (
    <WishListContext.Provider value={{ wishList, setWishList }}>
      {props.children}
    </WishListContext.Provider>
  );
};
