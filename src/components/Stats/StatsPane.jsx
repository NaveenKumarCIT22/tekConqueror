import React from "react";
import "./StatsPane.css";

const StatsPane = () => {
  const activeParticipant = {
    teamName: "Team Name",
    teamMembers: ["Member 1", "Member 2", "Member 3"],
    accountBalance: 20000,
    propertiesOwned: [
      {
        propertyName: "Property Name",
        propertyValue: "2000",
        propertyCategory: "Website Development",
      },
      {
        propertyName: "Property Name",
        propertyValue: "2000",
        propertyCategory: "Website Development",
      },
      {
        propertyName: "Property Name",
        propertyValue: "2000",
        propertyCategory: "Website Development",
      },
    ],
  };
  return (
    <div className="stats-pane">
      <h1 style={{ textAlign: "center" }}>Active Participants</h1>
      <div className="active-team">
        <p className="team-name">{activeParticipant.teamName}</p>
        <ol className="team-members">
          {activeParticipant.teamMembers.map((teamMember) => {
            return (
              <li className="team-member" key={crypto.randomUUID()}>
                {teamMember}
              </li>
            );
          })}
        </ol>
        <p className="account-balance">
          Balance Amount: {activeParticipant.accountBalance}
        </p>
        <ul className="properties-owned">
          {activeParticipant.propertiesOwned.map((prop) => {
            return (
              <li className="propertyy" key={crypto.randomUUID()}>
                <div className="property-details">
                  <h3 className="property-name">{prop.propertyName}</h3>
                  <p className="property-value">Price: {prop.propertyValue}</p>
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
