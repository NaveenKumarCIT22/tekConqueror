import React, { useEffect, useRef, useState } from "react";
import "./Board.css";
import StatsPane from "../Stats/StatsPane";
import CardDetails from "../CardDetails/CardDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import GameTimer from "../utils/GameTimer";

const Board = () => {
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const [curBatch, setcurBatch] = useState();
  const [part, setPart] = useState();
  const [chzObj, setChzObj] = useState({});
  const navigate = useNavigate();
  const [propList, setPropList] = useState([]);
  const idx = useRef(0);

  function reset() {
    axios
      .post(
        "/reset",
        { batchNo: curBatch },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(() => {
        window.location.reload();
      });
  }
  function displayParticipant(p, cur, isCurPlyr) {
    const { color, position } = p;
    const ind = part.length - cur;
    const element = isCurPlyr ? (
      <div
        style={{
          position: "relative",
          zIndex: ind,
        }}
        className="flag"
        key={crypto.randomUUID()}
      >
        <FontAwesomeIcon
          icon={faFlag}
          style={{
            color: color,
            fontSize: "2rem",
            position: "absolute",
          }}
          bounce
        />
      </div>
    ) : (
      <div
        style={{
          position: "relative",
          zIndex: ind,
        }}
        className="flag"
        key={crypto.randomUUID()}
      >
        <FontAwesomeIcon
          icon={faFlag}
          style={{
            color: color,
            fontSize: "1.5rem",
            position: "absolute",
          }}
        />
      </div>
    );
    return { position, element };
  }
  function displayerUtil(pos) {
    return part.map((p, i) => {
      const { position, element } = displayParticipant(
        p,
        i,
        p === part[idx.current]
      );
      if (position === pos) {
        return element;
      }
    });
  }

  function setOwner(curPos, plyr, prop) {
    propList[curPos].propOwner = plyr.teamName;
    plyr.propertiesOwned.push(prop.name);
  }

  // for getting current participants
  useEffect(() => {
    //btc = temporary current batch
    const btc = window.prompt("Enter Current Batch Number");
    setcurBatch(() => btc);
    if (curBatch === null) {
      navigate("/");
    } else {
      axios
        .post(
          `/participants`,
          { batchNo: btc },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          setPart(() => response.data);
        });
    }
  }, []);

  function rollDice() {
    axios
      .post(
        "/rollDice",
        { batchNo: curBatch, player: part[idx.current] },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((r) => {
        setPart((prev) => {
          return prev.map((p) => {
            if (p === part[idx.current]) {
              return {
                ...p,
                position: r.data.position,
              };
            } else {
              return p;
            }
          });
        });
        setDice1(() => r.data.dice1);
        setDice2(() => r.data.dice2);
        idx.current = (idx.current + 1) % part.length;
      });
    // console.log(part[idx.curent]);
  }

  return (
    <div className="wrapper">
      {/* <ModalBox /> */}
      <div className="board-container">
        <div className="table">
          <div className="board">
            <div className="center">
              <h1 className="title">Cyber Conquest</h1>
              {part && (
                <CardDetails currentParticipant={part[idx]} chzObj={chzObj} />
              )}
              <div
                className="
              dice-container"
                onClick={rollDice}
              >
                {dice1 !== 0 ? (
                  <img
                    src={`/images/dice${dice1}.png`}
                    alt=""
                    className="dice-image"
                  />
                ) : (
                  <img
                    src={`/images/dice1.png`}
                    alt=""
                    className="dice-image"
                  />
                )}
                {dice2 !== 0 ? (
                  <img
                    src={`/images/dice${dice2}.png`}
                    alt=""
                    className="dice-image"
                  />
                ) : (
                  <img
                    src={`/images/dice1.png`}
                    alt=""
                    className="dice-image"
                  />
                )}
              </div>
            </div>
            <div className="space corner go">
              <div className="container">
                <div className="instructions">Collect 200</div>
                {part && displayerUtil(0)}
                <div className="go-word">go</div>
              </div>
              <div className="arrow fa fa-long-arrow-left" />
            </div>
            <div className="row horizontal-row bottom-row">
              <div className="space chance">
                <div className="container">
                  <div className="color-bar light-blue" />
                  <div className="name">
                    GIT
                    {part && displayerUtil(7)}
                  </div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="color-bar light-blue" />
                  <div className="name">
                    Picto
                    <br />
                    graphy
                    {part && displayerUtil(6)}
                  </div>
                </div>
              </div>
              {/* <div className="space chance">
                <div className="container">
                  <div className="name">Chance</div>
                  {part && displayerUtil(5)}
                </div>
              </div> */}
              <div className="space chance">
                <div className="container">
                  <div className="color-bar light-blue" />
                  <div className="name">
                    Win
                    <br />
                    dows
                    {part && displayerUtil(5)}
                  </div>
                </div>
              </div>
              <div className="space fee income-tax">
                <div className="container">
                  <div className="name">Income Tax</div>
                  <div className="diamond" />
                  {part && displayerUtil(4)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">
                    DSA
                    {part && displayerUtil(3)}
                  </div>
                </div>
              </div>
              <div className="space community-chest">
                <div className="container">
                  <div className="name">
                    Commu
                    <br />
                    nity Chest
                  </div>
                  {part && displayerUtil(2)}
                </div>
              </div>
              <div className="space fee chance">
                <div className="container">
                  <div className="color-bar dark-purple" />
                  <div className="name">
                    cloud
                    {part && displayerUtil(1)}
                  </div>
                </div>
              </div>
            </div>
            <div className="space corner jail chance">
              {/* <div className="drawing"> */}
              <div className="container">
                <div
                  className="name"
                  style={{ color: "red", fontSize: "18px" }}
                >
                  Cyrpto
                  <br />
                  Locker
                  {part && displayerUtil(8)}
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="row vertical-row left-row">
              <div className="space chance">
                <div className="container">
                  <div className="color-bar orange" />
                  <div className="name">
                    Conne
                    <br />
                    ction
                    {part && displayerUtil(15)}
                  </div>
                </div>
              </div>
              <div className="space community-chest">
                <div className="container">
                  <div className="name">AI&DS</div>
                  {part && displayerUtil(14)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="color-bar orange" />
                  <div className="name">
                    Memory Game
                    {part && displayerUtil(13)}
                  </div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name long-name">Selenium</div>
                  {part && displayerUtil(12)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="color-bar purple" />
                  <div className="name">
                    Chances
                    {part && displayerUtil(11)}
                  </div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Codeacy</div>
                  {part && displayerUtil(10)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="color-bar purple" />
                  <div className="name">
                    Pancha than thiram
                    {part && displayerUtil(9)}
                  </div>
                </div>
              </div>
            </div>
            <div className="space corner free-parking">
              <div className="container">
                <div className="name">No Internet</div>
                {part && displayerUtil(16)}

                <div className="name">Connection</div>
              </div>
            </div>
            <div className="row horizontal-row top-row">
              <div className="space chance">
                <div className="container">
                  <div className="color-bar red" />
                  <div className="name">
                    Linux
                    {part && displayerUtil(17)}
                  </div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Sales Pitch</div>
                  {part && displayerUtil(18)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="color-bar red" />
                  <div className="name">
                    Cyber Security
                    {part && displayerUtil(19)}
                  </div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="color-bar red" />
                  <div className="name">
                    Commu nity Chest
                    {part && displayerUtil(20)}
                  </div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Snow flake</div>
                  {part && displayerUtil(21)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Current Affairs</div>
                  {/* <div className="space chance"></div> */}
                  {part && displayerUtil(22)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="color-bar yellow" />
                  <div className="name">
                    Block Chain
                    {part && displayerUtil(23)}
                  </div>
                </div>
              </div>
            </div>
            <div className="space corner go-to-jail">
              <div className="container">
                <div className="name">Tech</div>
                {part && displayerUtil(24)}
                <div className="name">Summit</div>
              </div>
            </div>
            <div className="row vertical-row right-row">
              <div className="space chance">
                <div className="container">
                  <div className="color-bar green" />
                  <div className="name three-line-name">
                    Chances
                    {part && displayerUtil(25)}
                  </div>
                </div>
              </div>
              <div className="space community-chest">
                <div className="container">
                  <div className="name">Program ming Language MCQs</div>
                  {part && displayerUtil(26)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="color-bar green" />
                  <div className="name long-name">
                    Fact or Myth
                    {part && displayerUtil(27)}
                  </div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Tech Anagrams</div>
                  {part && displayerUtil(28)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Do or Die</div>
                  {part && displayerUtil(29)}
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="color-bar dark-blue" />
                  <div className="name">
                    Web Devlep ment
                    {part && displayerUtil(30)}
                  </div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Histo rical Places</div>
                  {part && displayerUtil(31)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {part && (
        <div className="right-wrapper">
          <div className="game-timer">
            <GameTimer />
          </div>
          <StatsPane activeParticipant={part[idx.current]} />
          <button id="reset" onClick={reset}>
            Reset Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
