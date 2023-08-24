import React from "react";
import "./CardDetails.css";

function CardDetails({ propertyName, category, owner, price }) {
  return (
    <div className="card-details">
      <div className="card-det">
        <span id="propertyName">{"propertyName"}</span>
        <span id="category">{"category"}</span>
        {owner !== "" && <span id="owner">{"owner"}</span>}
        <span id="price">{"price"}</span>
        <button id="cardBtn">{owner !== "" ? "Face It" : "Buy It"}</button>
      </div>
    </div>
  );
}

export default CardDetails;
