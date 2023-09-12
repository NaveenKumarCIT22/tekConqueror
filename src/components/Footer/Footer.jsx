import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="sympo-det-container">
        <h0>TALOS</h0>
      </div>
      <vr></vr>
      <div className="devs-det-container">
        <h1>Developed By:</h1>
        <h2>
          <a href="github.com/NaveenKumarCIT22" target="_blank">
            Naveen Kumar M
          </a>
        </h2>
        <h2>
          <a href="github.com/Sarguru02">Sargurunathan G</a>
        </h2>
      </div>
    </div>
  );
}

export default Footer;
