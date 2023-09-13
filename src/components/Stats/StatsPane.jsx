import React from "react";
import "./StatsPane.css";
import { useParticipants } from "../../contexts/ParticipantContext";

const StatsPane = ({ activeParticipant }) => {
  // const activeParticipant = {
  //   teamName: "Team Name",
  //   members: ["Member 1", "Member 2", "Member 3"],
  //   balance: 20000,
  //   points: 50,
  //   propertiesOwned: [
  //     {
  //       propertyName: "Property Name",
  //       propertyValue: "2000",
  //       propertyCategory: "Website Development",
  //     },
  //     {
  //       propertyName: "Property Name",
  //       propertyValue: "2000",
  //       propertyCategory: "Website Development",
  //     },
  //     {
  //       propertyName: "Property Name",
  //       propertyValue: "2000",
  //       propertyCategory: "Website Development",
  //     },
  //   ],
  // };
  return (
    <div className="stats-pane">
      <h1 style={{ textAlign: "center" }}>Active Participants</h1>
      <div className="active-team">
        {/* title-container-part : teamname and color wrapper */}
        <div className="title-container-part">
          <p className="team-name">{activeParticipant.teamName}</p>
          <div
            className="part-color"
            style={{ backgroundColor: activeParticipant.color }}
          ></div>
        </div>
        <ol className="team-members">
          {activeParticipant.members.map((teamMember) => {
            return (
              <li className="team-member" key={crypto.randomUUID()}>
                {teamMember}
              </li>
            );
          })}
        </ol>
        <p className="account-balance">
          Balance Amount: {activeParticipant.balance}
        </p>
        {/* // part-color : participant color */}

        <p className="account-balance">Points: {activeParticipant.points}</p>
        <ul className="properties-owned">
          {activeParticipant.propertiesOwned &&
            activeParticipant.propertiesOwned.map((prop) => {
              return (
                <li className="propertyy" key={crypto.randomUUID()}>
                  <div className="property-details">
                    <h3 className="property-name">{prop.propertyName}</h3>
                    <p className="property-value">
                      Price: {prop.propertyValue}
                    </p>
                    <p className="property-category">
                      Type: {prop.propertyCategory}
                    </p>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default StatsPane;
