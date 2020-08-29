import React from "react";
import "./App.css";
import Board from "./components/Board";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/board" component={Board} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
