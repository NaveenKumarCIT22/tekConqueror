import React from "react";
import Board from "./components/Board/Board";
import { Route, Routes } from "react-router-dom";
import StatsPane from "./components/Stats/StatsPane";
import { ParticipantList } from "./contexts/ParticipantContext";
import AddParticipant from "./components/Participant/AddParticipant";
import CardDetails from "./components/CardDetails/CardDetails";

const App = () => {
  return (
    <div className="wrapper">
      <ParticipantList>
        <Routes>
          <Route path="/board" element={<Board />} />
          <Route path="/" element={<AddParticipant />} />
          <Route path="/card" element={<CardDetails />} />
        </Routes>
      </ParticipantList>
    </div>
  );
};

export default App;
