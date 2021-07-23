import React from "react";
import AddResto from "../components/AddResto";
import Header from "../components/Header";
import RestoList from "../components/RestoList";

const Home = () => {
  return (
    <div>
        <Header/>
        <AddResto/>
        <RestoList/>
    </div>
  );
};

export default Home;
