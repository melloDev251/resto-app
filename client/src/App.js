import React from "react";
import Route from "./components/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { RestoContextProvider } from "./context/RestoContext";

const App = () => {
  return (
    <RestoContextProvider>
      <div className="container">
        <Route />
      </div>
    </RestoContextProvider>
  );
};

export default App;
