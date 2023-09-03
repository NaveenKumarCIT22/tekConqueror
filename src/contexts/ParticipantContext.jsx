import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

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
  async function rollDice() {
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
  const participants = [
    {
      teamName: "Team 1",
      batchNo: 1,
      members: ["member1", "member2"],
      color: generateNewColor(),
      position: 9,
      balance: 500,
      points: 0,
    },
  ];

  const addParticipant = async (participant) => {
    const collectionName = participant.batchNo.toString();
    participant = {
      ...participant,
      color: generateNewColor(),
      position: 0,
      balance: 500,
      points: 0,
    };
    await setDoc(doc(db, collectionName, participant.teamName), participant);
    console.log("doc deleted");
  };
  const getCurrentParticipants = async (batchNo) => {
    const a = await getDocs(collection(db, batchNo.toString()));

    a.forEach((docu) => {
      participants.push(docu.data());
    });
  };

  function displayParticipant(p) {
    const { color, position } = p;
    const element = (
      <div className="flag">
        <FontAwesomeIcon
          icon={faFlag}
          style={{
            color: color,
            fontSize: "1.5rem",
            position: position,
            zIndex: 2,
          }}
        />
      </div>
    );
    return { position, element };
  }
  const value = {
    participants,
    addParticipant,
    rollDice,
    getPosition,
    displayParticipant,
    dice1,
    dice2,
    getCurrentParticipants,
  };
  return (
    <participantContext.Provider value={value}>
      {children}
    </participantContext.Provider>
  );
}
