import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Detail from "../../pages/Detail";
import Home from "../../pages/Home";
import Update from "../../pages/Update";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/resto/:id/update" component={Update} />
        <Route path="/resto/:id/detail" component={Detail} />
      </Switch>
    </Router>
  );
};

export default index;
