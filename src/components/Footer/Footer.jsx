import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="devs-det-container">
        <h1>Developed By:</h1>
        <div className="devs-det">
          <div className="my-det">
            {/* <h2> */}
            <a
              href="https://www.linkedin.com/in/naveen-kumar-m-366b75256/"
              target="_blank"
            >
              Naveen Kumar M
            </a>
            <a href="https://github.com/NaveenKumarCIT22" target="_blank">
              GitHub: NaveenKumarCIT22
            </a>
            {/* </h2> */}
          </div>
          <div className="sarguru-det">
            {/* <h2> */}
            <a
              href="https://www.linkedin.com/in/sargurunathan-palanivel-2a6a0524b/"
              target="_blank"
            >
              Sargurunathan P
            </a>
            <a href="https://github.com/Sarguru02" target="_blank">
              GitHub: Sarguru02
            </a>
            {/* </h2> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
