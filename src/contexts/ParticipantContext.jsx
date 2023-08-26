import React, { useContext, useState } from "react";

const participantContext = React.createContext();

export function useParticipants() {
  return useContext(participantContext);
}
export function ParticipantList({ children }) {
  const [position, setPosition] = useState(0);
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const hexCharacters = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  const minBalance = 500; 



  function getCharacter(index) {
    return hexCharacters[index];
  }

  function generateNewColor() {
    let hexColorRep = "#";

    for (let index = 0; index < 6; index++) {
      const randomPosition = Math.floor(Math.random() * hexCharacters.length);
      hexColorRep += getCharacter(randomPosition);
    }

    return hexColorRep;
  }
  function rollDice() {
    // d1 - temporary dice1 variable
    const d1 = Math.ceil(Math.random() * 6);

    //d2 - temporary dice2 variable
    const d2 = Math.ceil(Math.random() * 6);

    setPosition((pos) => {
      return (d1 + d2 + pos) % 32;
    });

    setDice1(d1);
    setDice2(d2);
  }
  function getPosition() {
    return position;
  }
  const participants  =[
    {
      teamName: "Team 1",
      batchNo: 1,
      members: ["member1", "member2"],
      color: generateNewColor(),
      position: 0,
      balance: 500, 
      points: 0,
    },
  ];

  const addParticipant = (participant) => {
    try {
      let participants = localStorage.getItem(`${participant.batchNo}`);
      participant = {...participant, color: generateNewColor(), position: 0, balance: 500, points: 0};
      participants.push(participant);
      localStorage.setItem(`${participant.batchNo}`, JSON.stringify(participants));
    } catch (e) {
      console.log(e)
      let participants = [];
      participant = {...participant, color: generateNewColor(), position: 0, balance: 500, points: 0};
      participants.push(participant);
      localStorage.setItem(`${participant.batchNo}`, JSON.stringify(participants)); 
    }
  };
  const value = {
    participants,
    addParticipant,
    rollDice,
    getPosition,
    dice1, 
    dice2,
  };
  return (
    <participantContext.Provider value={value}>
      {children}
    </participantContext.Provider>
  );
}
