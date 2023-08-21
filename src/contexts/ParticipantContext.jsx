import React, { useContext, useState } from "react";

const participantContext = React.createContext();

export function useParticipants() {
  return useContext(participantContext);
}
export function ParticipantList({ children }) {
  const [participants, setParticipants] = useState([
    {
      teamName: "Team 1",
      batchNo: 1,
      members: ["member1", "member2"],
    },
  ]);

  const addParticipant = (participant) => {
    participants.push(participant);
  };
  const value = {
    participants,
    addParticipant,
  };
  return (
    <participantContext.Provider value={value}>
      {children}
    </participantContext.Provider>
  );
}
