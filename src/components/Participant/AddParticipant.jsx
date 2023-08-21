import React, { useState } from "react";
import { useParticipants } from "../../contexts/ParticipantContext";

function AddParticipant() {
  const { participants, addParticipant } = useParticipants();
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    batchNo: 0,
    members: [],
  });
  const [member, setMember] = useState("");
  function addMember() {
    teamInfo.members.push(member);
    setMember("");
  }
  function handleSubmit(e) {
    e.preventDefault();
    addParticipant(teamInfo);
    console.log("Submitted");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="teamName"
        id="teamName"
        value={teamInfo.teamName}
        onChange={(e) => {
          setTeamInfo((prev) => {
            return {
              ...prev,
              teamName: e.target.value,
            };
          });
        }}
        placeholder="Enter Team Name"
      />
      <input
        type="text"
        name="member"
        id="member"
        value={member}
        onChange={(e) => {
          setMember((prev) => {
            return e.target.value;
          });
        }}
        placeholder="Enter Member "
      />
      <button onClick={addMember}>Next</button>{" "}
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddParticipant;
