import React, { useContext, useState } from "react";
import axios from "axios";

const participantContext = React.createContext();

export function useParticipants() {
  return useContext(participantContext);
}
export function ParticipantList({ children }) {
  const [currentBatch, setCurrentBatch] = useState();

  const addParticipant = async (participant) => {
    axios
      .post(
        "/addTeam",
        { participant },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((r) => {
        console.log(r.data);
      });
  };

  const value = {
    addParticipant,
    setCurrentBatch,
    currentBatch,
  };
  return (
    <participantContext.Provider value={value}>
      {children}
    </participantContext.Provider>
  );
}
