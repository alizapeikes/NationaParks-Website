import React, { useState, useEffect } from "react";

export const DisplayParkContext = React.createContext();

export const DisplayParkProvider = (props) => {
  const [park, setPark] = useState("");
  return (
    <DisplayParkContext.Provider value={{ park, setPark }}>
      {props.children}
    </DisplayParkContext.Provider>
  );
};
