import React, { useContext, useMemo, useReducer } from "react";
import BoardContext, { initialState } from "./state/BoardContext";
import reducer from "./state/reducer";
import "./App.css";

import Board from "./components/Board";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <div className="App" style={{ background: "#b19cd9", height: 1000 }}>
      <BoardContext.Provider value={contextValue}>
        <Board />
      </BoardContext.Provider>
    </div>
  );
}

export default App;
