import React, { useState, createContext } from "react";

export const RestoContext = createContext();

export const RestoContextProvider = (props) => {
  const [restaurant, setRestaurant] = useState([]);

  const addRestaurant = (resto) => {
    setRestaurant([...restaurant, resto])
  }
  return (
    <RestoContext.Provider value={{restaurant, setRestaurant, addRestaurant}}>
      {props.children}
    </RestoContext.Provider>
  );
};
