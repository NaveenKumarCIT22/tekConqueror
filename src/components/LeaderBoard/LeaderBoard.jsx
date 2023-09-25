import axios from "axios";
import { useParticipants } from "../../contexts/ParticipantContext";
import "./LeaderBoard.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// const leaders = [
//   // points wise descending la send pannu bro
//   {
//     teamName: "Team 1",
//     points: 7,
//     batch: 0,
//   },
//   {
//     teamName: "Team 2",
//     points: 9,
//     batch: 0,
//   },
//   {
//     teamName: "Team 3",
//     points: 5,
//     batch: 0,
//   },
//   {
//     teamName: "Team 4",
//     points: 10,
//     batch: 0,
//   },
//   {
//     teamName: "Team 5",
//     points: 8,
//     batch: 0,
//   },
// ];

function LeaderBoard() {
  const [leaders, setLeaders] = useState();
  const params = useParams();
  useEffect(() => {
    axios
      .post(
        "/participants",
        { batchNo: params.btcNo },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((r) => setLeaders(() => r.data.slice(0, 5)));
  }, []);
  leaders && leaders.sort((a, b) => b.points - a.points);
  return (
    <div className="leader-board-container">
      <div className="leader-board-inner-container">
        <div className="leader-board-title">
          <h1>Leader Board</h1>
          <h1>Batch: {leaders && leaders[0].batchNo}</h1>
        </div>
        <div className="leaders leaders-header">
          <div className="leader-team-rank">Rank</div>
          <div className="leader-team-name">Team Name</div>
          <div className="leader-team-points">Points</div>
        </div>
        <div className="leader-board-arena">
          {/* <div className="leaders" key={crypto.randomUUID()}>
            <div className="leader-team-rank" key={crypto.randomUUID()}>
              0
            </div>
            <div className="leader-team-name" key={crypto.randomUUID()}>
              TeamName
            </div>
            <div className="leader-team-points" key={crypto.randomUUID()}>
              TeamPoints
            </div> */}
          {/* </div> */}
          {leaders &&
            leaders.map((ele, rank) => {
              return (
                <div className="leaders" key={crypto.randomUUID()}>
                  <div className="leader-team-rank" key={crypto.randomUUID()}>
                    {rank + 1}
                  </div>
                  <div className="leader-team-name" key={crypto.randomUUID()}>
                    {ele.teamName}
                  </div>
                  <div className="leader-team-points" key={crypto.randomUUID()}>
                    {ele.points}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
