import React, { useMemo, useReducer, useEffect } from "react";
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

  console.log("state", state);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <div className="App" style={{ background: "#b19cd9", height: "1000px" }}>
      <Navbar />
      <Switch>
        <Route path="/board">
          {/* <BoardContext.Provider value={contextValue}> */}
          <Board />
          {/* </BoardContext.Provider> */}
        </Route>
        <Route path="/" component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
