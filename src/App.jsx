import React from "react";
import Board from "./components/Board/Board";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/board" element={<Board />} />
      </Routes>
    </div>
  );
};

export default App;
