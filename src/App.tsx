import React, { useEffect, useMemo, useReducer } from "react";
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
    <div className="App">
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
