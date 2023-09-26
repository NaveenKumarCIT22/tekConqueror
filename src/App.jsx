import React, { useState } from "react";
import Board from "./components/Board/Board";
import { Route, Routes } from "react-router-dom";
import { ParticipantList } from "./contexts/ParticipantContext";
import AddParticipant from "./components/Participant/AddParticipant";
import CardDetails from "./components/CardDetails/CardDetails";
import axios from "axios";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer/Footer";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Chance from "./components/Quiz/Chance";
import TextQuiz from "./components/Quiz/TextQuiz";
import MemoryQuiz from "./components/Quiz/MemoryQuiz";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <ParticipantList>
        <Routes>
          <Route path="/" element={<AddParticipant />} />
          <Route path="/board" element={<Board />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/quiz" element={<MemoryQuiz />} />
          <Route path="/leaderboard/:btcNo?" element={<LeaderBoard />} />
          <Route path="/chance" element={<Chance />} />
          <Route path="/textquiz" element={<TextQuiz />} />
          <Route path="/card" element={<CardDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ParticipantList>
      <Footer />
    </>
  );
};

export default App;
