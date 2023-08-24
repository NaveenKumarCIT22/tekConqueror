import React, { useState } from "react";
import Board from "./components/Board/Board";
import { Route, Routes } from "react-router-dom";
import StatsPane from "./components/Stats/StatsPane";
import { ParticipantList } from "./contexts/ParticipantContext";
import AddParticipant from "./components/Participant/AddParticipant";
import CardDetails from "./components/CardDetails/CardDetails";
import ModalBox from "./components/ModalBox/ModalBox";

const App = () => {
  // const [data, setData] = useState({});
  // fetch("testJSON.json", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((r) => {
  //     console.log(r);
  //     setData(r);
  //   });
  // console.log(data);
  return (
    <div className="wrapper">
      <ParticipantList>
        <Routes>
          <Route path="/board" element={<Board />} />
          <Route path="/modal" element={<ModalBox />} />
          <Route path="/" element={<AddParticipant />} />
          <Route path="/card" element={<CardDetails />} />
        </Routes>
      </ParticipantList>
    </div>
  );
};

export default App;
