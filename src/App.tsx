import React from "react";
import "./App.css";
import TopFree from "./components/TopFree";
import TopGrossing from "./components/TopGrossing";

function App() {
  return (
    <div className="App">
      <span>
        <TopFree />
      </span>
      <span>
        <TopGrossing />
      </span>
    </div>
  );
}

export default App;
