import React, { useMemo, useReducer, useEffect, useState } from "react";
import BoardContext, { initialState } from "./state/BoardContext";

import reducer from "./state/reducer";
import "./App.css";
import Board from "./components/Board";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import { saveState } from "./utils";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hide",
        // textAlign: "center",
      }}
    >
      <Navbar />
      <Switch>
        <Route path="/board">
          <BoardContext.Provider value={contextValue}>
            <Board />
          </BoardContext.Provider>
        </Route>
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
