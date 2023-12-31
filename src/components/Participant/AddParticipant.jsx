import React, { useState } from "react";
import { useParticipants } from "../../contexts/ParticipantContext";
import "./AddParticipant.css";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

function AddParticipant() {
  const navigate = useNavigate();
  const { addParticipant } = useParticipants();
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
    setTeamInfo({
      teamName: "",
      batchNo: 0,
      members: [],
    });
  }
  return (
    <>
      <div className="participant-container">
        <h1>Welcome to Cyber Conquest</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="batchNo"
            id="batchNo"
            className="participant-elements"
            value={teamInfo.batchNo}
            onChange={(e) => {
              setTeamInfo((prev) => {
                return {
                  ...prev,
                  batchNo: e.target.value,
                };
              });
            }}
            placeholder="Enter Batch Number"
          />
          <input
            type="text"
            name="teamName"
            id="teamName"
            className="participant-elements"
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
            className="participant-elements"
            onChange={(e) => {
              setMember((prev) => {
                return e.target.value;
              });
            }}
            placeholder="Enter Member "
          />
          <div className="btn-wraper">
            <button
              onClick={addMember}
              className="participant-elements"
              type="button"
            >
              Add Members
            </button>{" "}
            <button type="submit" className="participant-elements">
              Add Team
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate("/board")}
            className="participant-elements"
          >
            Let's Play!!!
          </button>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default AddParticipant;
