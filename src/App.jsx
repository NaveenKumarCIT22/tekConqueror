import React, { useState } from "react";
import Board from "./components/Board/Board";
import { Route, Routes } from "react-router-dom";
import StatsPane from "./components/Stats/StatsPane";
import { ParticipantList } from "./contexts/ParticipantContext";
import AddParticipant from "./components/Participant/AddParticipant";
import CardDetails from "./components/CardDetails/CardDetails";
import ModalBox from "./components/ModalBox/ModalBox";
import axios from "axios";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer/Footer";
import Quiz from "./components/Quiz/Quiz";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    // <div className="wrapper">
    <ParticipantList>
      <Routes>
        <Route path="/" element={<AddParticipant />} />
        <Route path="/board" element={<Board />} />
        <Route path="/modal" element={<ModalBox />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/quiz" element={<Quiz />} />
        {/* <Route path="/card" element={<CardDetails />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ParticipantList>
    // </div>
  );
};

export default App;
