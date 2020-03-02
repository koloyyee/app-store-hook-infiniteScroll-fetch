import React from "react";
import "./App.css";
import TopFree from "./components/TopFree";
import TopGrossing from "./components/TopGrossing";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <div className="App">
      <span>
        <TopFree />
      </span>
      <span>
        <TopGrossing />
    </span>
    <span>

      <BottomNav />
    </span>
  </div>
  );
}

export default App;
