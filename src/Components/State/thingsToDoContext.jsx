import React, { useState } from "react";

export const ThingsTodoContext = React.createContext();

export const ThingsTodoProvider = (props) => {
  const [thingsTodo, setThingsTodo] = useState({ name: "", list: [] });
  return (
    <ThingsTodoContext.Provider value={{ thingsTodo, setThingsTodo }}>
      {props.children}
    </ThingsTodoContext.Provider>
  );
};
