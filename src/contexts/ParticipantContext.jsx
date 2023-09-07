import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const participantContext = React.createContext();

export function useParticipants() {
  return useContext(participantContext);
}
export function ParticipantList({ children }) {
  const participants = [];

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

  function displayParticipant(p) {
    const { color, position } = p;
    const element = (
      <div className="flag" key={crypto.randomUUID()}>
        <FontAwesomeIcon
          icon={faFlag}
          style={{
            color: color,
            fontSize: "1.5rem",
            position: "absolute",
            zIndex: 2,
          }}
        />
      </div>
    );
    return { position, element };
  }
  const value = {
    addParticipant,
    displayParticipant,
  };
  return (
    <participantContext.Provider value={value}>
      {children}
    </participantContext.Provider>
  );
}
