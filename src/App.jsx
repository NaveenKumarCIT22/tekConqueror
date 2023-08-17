import React from "react";
import Board from "./components/Board/Board";
import { Route, Routes } from "react-router-dom";
import StatsPane from "./components/Stats/StatsPane";

const App = () => {
  return (
    <div className="wrapper">
      <StatsPane />
      {/* <Routes>
        <Route path="/board" element={<Board />} />
      </Routes> */}
    </div>
  );
};

export default App;
