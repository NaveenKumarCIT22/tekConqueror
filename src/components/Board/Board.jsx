import React, { useEffect, useState } from "react";
import "./Board.css";
import StatsPane from "../Stats/StatsPane";
import { useParticipants } from "../../contexts/ParticipantContext";
import CardDetails from "../CardDetails/CardDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ModalBox from "../ModalBox/ModalBox";

const Board = () => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [currentParticipant, setCurrentParticipant] = useState();
  const [curBatch, setcurBatch] = useState();
  const [part, setPart] = useState();
  const { displayParticipant } = useParticipants();
  const navigate = useNavigate();

  function getCurrentPlayer() {
    return axios
      .post(
        "/current",
        { batchNo: curBatch },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((r) => {
        setCurrentParticipant(r.data);
        return r.data;
      });
  }

  function displayerUtil(pos) {
    return part.map((p) => {
      const { position, element } = displayParticipant(p);
      if (position === pos) {
        return element;
      }
    });
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
          setPart(response.data);
        });
    }
  }, []);

  function rollDice() {
    getCurrentPlayer().then((result) => {
      const player = result ? result : {};
      console.log(player);
      axios
        .post(
          "/rollDice",
          { batchNo: curBatch, player },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          setDice1(() => response.data.dice1);
          setDice2(() => response.data.dice2);
          console.log(response.data);
        });
    });
  }

  return (
    <div className="wrapper">
      <ModalBox />
      <div className="board-container">
        <div className="table">
          <div className="board">
            <div className="center">
              <h1 className="title">Cyber Conquest</h1>
              <CardDetails />
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
                <div className="instructions">
                  Collect $200.00 salary as you pass
                </div>
                {part && displayerUtil(0)}
                <div className="go-word">go</div>
              </div>
              <div className="arrow fa fa-long-arrow-left" />
            </div>
            <div className="row horizontal-row bottom-row">
              <div className="space property">
                <div className="container">
                  <div className="color-bar light-blue" />
                  <div className="name">
                    Connecticut Avenue
                    {part && displayerUtil(7)}
                  </div>
                  <div className="price">PRICE $120</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar light-blue" />
                  <div className="name">
                    Vermont Avenue
                    {part && displayerUtil(6)}
                  </div>
                  <div className="price">Price $100</div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Chance</div>
                  {part && displayerUtil(5)}
                </div>
              </div>
              <div className="space railroad">
                <div className="container">
                  <div className="name">Reading Railroad</div>

                  <div className="price">Price $200</div>
                </div>
              </div>
              <div className="space fee income-tax">
                <div className="container">
                  <div className="name">Income Tax</div>
                  <div className="diamond" />
                  {part && displayerUtil(3)}
                </div>
              </div>
              <div className="space community-chest">
                <div className="container">
                  <div className="name">Community Chest</div>
                  {part && displayerUtil(2)}
                  <div className="instructions">
                    Follow instructions on top card
                  </div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar dark-purple" />
                  <div className="name three-line-name">
                    Mediter-
                    <br />
                    ranean
                    <br />
                    Avenue
                    {part && displayerUtil(1)}
                  </div>
                  <div className="price">Price $50</div>
                </div>
              </div>
            </div>
            <div className="space corner jail">
              <div className="just">Just</div>
              <div className="drawing">
                <div className="container">
                  <div className="name">In</div>
                  <div className="window">
                    <div className="bar" />
                    <div className="bar" />
                    <div className="bar" />
                    {part && displayerUtil(8)}
                  </div>
                  <div className="name">Jail</div>
                </div>
              </div>
              <div className="visiting">Visiting</div>
            </div>
            <div className="row vertical-row left-row">
              <div className="space property">
                <div className="container">
                  <div className="color-bar orange" />
                  <div className="name">
                    Tennessee Avenue
                    {part && displayerUtil(15)}
                  </div>
                  <div className="price">Price $180</div>
                </div>
              </div>
              <div className="space community-chest">
                <div className="container">
                  <div className="name">Community Chest</div>
                  {part && displayerUtil(14)}
                  <div className="instructions">
                    Follow instructions on top card
                  </div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar orange" />
                  <div className="name">
                    St. James Avenue
                    {part && displayerUtil(13)}
                  </div>
                  <div className="price">Price $180</div>
                </div>
              </div>
              <div className="space railroad">
                <div className="container">
                  <div className="name long-name">Pennsylvania Railroad</div>
                  {part && displayerUtil(12)}
                  <div className="price">Price $200</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar purple" />
                  <div className="name">
                    States Avenue
                    {part && displayerUtil(11)}
                  </div>
                  <div className="price">Price $140</div>
                </div>
              </div>
              <div className="space utility electric-company">
                <div className="container">
                  <div className="name">Electric Company</div>
                  {part && displayerUtil(10)}
                  <div className="price">Price $150</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar purple" />
                  <div className="name">
                    St. Charles Place
                    {part && displayerUtil(9)}
                  </div>
                  <div className="price">Price $140</div>
                </div>
              </div>
            </div>
            <div className="space corner free-parking">
              <div className="container">
                <div className="name">Free</div>
                {part && displayerUtil(16)}

                <div className="name">Parking</div>
              </div>
            </div>
            <div className="row horizontal-row top-row">
              <div className="space property">
                <div className="container">
                  <div className="color-bar red" />
                  <div className="name">
                    Kentucky Avenue
                    {part && displayerUtil(17)}
                  </div>
                  <div className="price">Price $220</div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Chance</div>
                  {part && displayerUtil(18)}
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar red" />
                  <div className="name">
                    Indiana Avenue
                    {part && displayerUtil(19)}
                  </div>
                  <div className="price">Price $220</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar red" />
                  <div className="name">
                    Illinois Avenue
                    {part && displayerUtil(20)}
                  </div>
                  <div className="price">Price $200</div>
                </div>
              </div>
              <div className="space railroad">
                <div className="container">
                  <div className="name">B &amp; O Railroad</div>
                  {part && displayerUtil(21)}
                  <div className="price">Price $200</div>
                </div>
              </div>
              <div className="space utility waterworks">
                <div className="container">
                  <div className="name">Waterworks</div>
                  <div className="space property"></div>
                  {part && displayerUtil(22)}
                  <div className="price">Price $120</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar yellow" />
                  <div className="name">
                    Marvin Gardens
                    {part && displayerUtil(23)}
                  </div>
                  <div className="price">Price $280</div>
                </div>
              </div>
            </div>
            <div className="space corner go-to-jail">
              <div className="container">
                <div className="name">Go To</div>
                {part && displayerUtil(24)}
                <div className="name">Jail</div>
              </div>
            </div>
            <div className="row vertical-row right-row">
              <div className="space property">
                <div className="container">
                  <div className="color-bar green" />
                  <div className="name three-line-name">
                    North Carolina Avenue
                    {part && displayerUtil(25)}
                  </div>
                  <div className="price">Price $300</div>
                </div>
              </div>
              <div className="space community-chest">
                <div className="container">
                  <div className="name">Community Chest</div>
                  {part && displayerUtil(26)}
                  <div className="instructions">
                    Follow instructions on top card
                  </div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar green" />
                  <div className="name long-name">
                    Pennsylvania Avenue
                    {part && displayerUtil(27)}
                  </div>
                  <div className="price">Price $320</div>
                </div>
              </div>
              <div className="space railroad">
                <div className="container">
                  <div className="name">Short Line</div>
                  {part && displayerUtil(28)}
                  <div className="price">Price $200</div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Chance</div>
                  {part && displayerUtil(29)}
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar dark-blue" />
                  <div className="name">
                    Park Place
                    {part && displayerUtil(30)}
                  </div>
                  <div className="price">Price $350</div>
                </div>
              </div>
              <div className="space fee luxury-tax">
                <div className="container">
                  <div className="name">Luxury Tax</div>
                  {part && displayerUtil(31)}
                  <div className="instructions">Pay $75.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentParticipant && (
        <StatsPane activeParticipant={currentParticipant} />
      )}
    </div>
  );
};

export default Board;
