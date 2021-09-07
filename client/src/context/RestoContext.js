import React, { useState, createContext } from "react";

export const RestoContext = createContext();

export const RestoContextProvider = (props) => {
  const [restaurant, setRestaurant] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  // const [reviews, setReviews] = useState(null)

  const addRestaurant = (resto) => {
    setRestaurant([...restaurant, resto]);
  };

  // const addReview = (item) => {
  //   setReviews([...reviews, item])
  // }
  return (
    <RestoContext.Provider
      value={{
        restaurant,
        setRestaurant,
        addRestaurant,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {props.children}
    </RestoContext.Provider>
  );
};
