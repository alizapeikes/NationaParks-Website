import React, { useReducer } from "react";

const changeDisplayedParkContext = (state, action) => {
  const newParkInfo = JSON.parse(JSON.stringify(action.parkInfo));

  return newParkInfo;
};

export const DisplayParkContext = React.createContext();

const initialPark = { name: "no park chosen" };

export const DisplayParkProvider = (props) => {
  const [parkStateInfo, dispatchSetPark] = useReducer(
    changeDisplayedParkContext,
    initialPark
  );
  return (
    <DisplayParkContext.Provider
      value={{ parkState: parkStateInfo, parkCodeDispatch: dispatchSetPark }}
    >
      {props.children}
    </DisplayParkContext.Provider>
  );
};
