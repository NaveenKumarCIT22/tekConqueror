import React, { useEffect, useState } from "react";
import "./Board.css";
import StatsPane from "../Stats/StatsPane";
import { useParticipants } from "../../contexts/ParticipantContext";
import CardDetails from "../CardDetails/CardDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ModalBox from "../ModalBox/ModalBox";
import Footer from "../Footer/Footer";

const Board = () => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [currentParticipant, setCurrentParticipant] = useState();
  const [curBatch, setcurBatch] = useState();
  const [part, setPart] = useState();
  const { displayParticipant } = useParticipants();
  const navigate = useNavigate();

  function getPosition() {
    return -1;
  }
  function getCurrentPlayer() {
    axios
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
      });
  }
  // for getting current participants
  useEffect(() => {
    //btc = temporary current batch
    const btc = window.prompt("Enter Current Batch Number");
    setcurBatch(btc);
    if (btc === null) {
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
    getCurrentPlayer();
    currentParticipant &&
      axios
        .post(
          "/rollDice",
          { batchNo: curBatch },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          setDice1(response.data.dice1);
          setDice2(response.data.dice2);
          console.log(response.data);
        });
  }

  return (
    <>
      <div className="wrapper">
        {/* <ModalBox /> */}
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
                  {part &&
                    part.map((p) => {
                      const { position, element } = displayParticipant(p);
                      if (position === 0) {
                        return element;
                      }
                    })}
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
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 7) {
                            return element;
                          }
                        })}
                    </div>
                    <div className="price">PRICE $120</div>
                  </div>
                </div>
                <div className="space property">
                  <div className="container">
                    <div className="color-bar light-blue" />
                    <div className="name">
                      Vermont Avenue
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 6) {
                            return element;
                          }
                        })}
                    </div>
                    <div className="price">Price $100</div>
                  </div>
                </div>
                <div className="space chance">
                  <div className="container">
                    <div className="name">Chance</div>
                    {part &&
                      part.map((p) => {
                        const { position, element } = displayParticipant(p);
                        if (position === 5) {
                          return element;
                        }
                      })}
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
                    {part &&
                      part.map((p) => {
                        const { position, element } = displayParticipant(p);
                        if (position === 3) {
                          return element;
                        }
                      })}
                  </div>
                </div>
                <div className="space community-chest">
                  <div className="container">
                    <div className="name">Community Chest</div>
                    {part &&
                      part.map((p) => {
                        const { position, element } = displayParticipant(p);
                        if (position === 2) {
                          return element;
                        }
                      })}
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
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 1) {
                            return element;
                          }
                        })}
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
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 8) {
                            return element;
                          }
                        })}
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
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 15) {
                            return element;
                          }
                        })}
                    </div>
                    <div className="price">Price $180</div>
                  </div>
                </div>
                <div className="space community-chest">
                  <div className="container">
                    <div className="name">Community Chest</div>
                    {part &&
                      part.map((p) => {
                        const { position, element } = displayParticipant(p);
                        if (position === 14) {
                          return element;
                        }
                      })}
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
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          return position === 13 ? element : "";
                        })}
                    </div>
                    <div className="price">Price $180</div>
                  </div>
                </div>
                <div className="space railroad">
                  <div className="container">
                    <div className="name long-name">Pennsylvania Railroad</div>
                    {part &&
                      part.map((p) => {
                        const { position, element } = displayParticipant(p);
                        if (position === 12) {
                          return element;
                        }
                      })}
                    <div className="price">Price $200</div>
                  </div>
                </div>
                <div className="space property">
                  <div className="container">
                    <div className="color-bar purple" />
                    <div className="name">
                      States Avenue
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 11) {
                            return element;
                          }
                        })}
                    </div>
                    <div className="price">Price $140</div>
                  </div>
                </div>
                <div className="space utility electric-company">
                  <div className="container">
                    <div className="name">Electric Company</div>
                    {part &&
                      part.map((p) => {
                        const { position, element } = displayParticipant(p);
                        if (position === 10) {
                          return element;
                        }
                      })}
                    <div className="price">Price $150</div>
                  </div>
                </div>
                <div className="space property">
                  <div className="container">
                    <div className="color-bar purple" />
                    <div className="name">
                      St. Charles Place
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 9) {
                            return element;
                          }
                        })}
                    </div>
                    <div className="price">Price $140</div>
                  </div>
                </div>
              </div>
              <div className="space corner free-parking">
                <div className="container">
                  <div className="name">Free</div>
                  {part &&
                    part.map((p) => {
                      const { position, element } = displayParticipant(p);
                      if (position === 16) {
                        return element;
                      }
                    })}

                  <div className="name">Parking</div>
                </div>
              </div>
              <div className="row horizontal-row top-row">
                <div className="space property">
                  <div className="container">
                    <div className="color-bar red" />
                    <div className="name">
                      Kentucky Avenue
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 17) {
                            return element;
                          }
                        })}
                    </div>
                    <div className="price">Price $220</div>
                  </div>
                </div>
                <div className="space chance">
                  <div className="container">
                    <div className="name">Chance</div>
                    {part &&
                      part.map((p) => {
                        const { position, element } = displayParticipant(p);
                        if (position === 18) {
                          return element;
                        }
                      })}
                  </div>
                </div>
                <div className="space property">
                  <div className="container">
                    <div className="color-bar red" />
                    <div className="name">
                      Indiana Avenue
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 19) {
                            return element;
                          }
                        })}
                    </div>
                    <div className="price">Price $220</div>
                  </div>
                </div>
                <div className="space property">
                  <div className="container">
                    <div className="color-bar red" />
                    <div className="name">
                      Illinois Avenue
                      {part &&
                        part.map((p) => {
                          const { position, element } = displayParticipant(p);
                          if (position === 20) {
                            return element;
                          }
                        })}
                    </div>
                    <div className="price">Price $200</div>
                  </div>
                </div>
                <div className="space railroad">
                  <div className="container">
                    <div className="name">B &amp; O Railroad</div>
                    {part &&
                      part.map((p) => {
                        const { position, element } = displayParticipant(p);
                        if (position === 21) {
                          return element;
                        }
                      })}
                    <div className="price">Price $200</div>
                  </div>
                </div>
                <div className="space utility waterworks">
                  <div className="container">
                    <div className="name">Waterworks</div>
                    <div className="space property"></div>
                    {part &&
                      part.map((p) => {
                        const { position, element } = displayParticipant(p);
                        if (position === 22) {
                          return element;
                        }
                      })}
                    <div className="price">Price $120</div>
                  </div>
                </div>
                <div className="space property">
                  <div className="container">
                    <div className="color-bar yellow" />
                    <div className="name">
                      Marvin Gardens
                      {getPosition() === 23 && element}
                    </div>
                    <div className="price">Price $280</div>
                  </div>
                </div>
              </div>
              <div className="space corner go-to-jail">
                <div className="container">
                  <div className="name">Go To</div>
                  {getPosition() === 24 ? (
                    element
                  ) : (
                    <i className="drawing fa fa-gavel" />
                  )}
                  <div className="name">Jail</div>
                </div>
              </div>
              <div className="row vertical-row right-row">
                <div className="space property">
                  <div className="container">
                    <div className="color-bar green" />
                    <div className="name three-line-name">
                      North Carolina Avenue
                      {getPosition() === 25 && element}
                    </div>
                    <div className="price">Price $300</div>
                  </div>
                </div>
                <div className="space community-chest">
                  <div className="container">
                    <div className="name">Community Chest</div>
                    {getPosition() === 26 ? (
                      element
                    ) : (
                      <i className="drawing fa fa-cube" />
                    )}
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
                      {getPosition() === 27 && element}
                    </div>
                    <div className="price">Price $320</div>
                  </div>
                </div>
                <div className="space railroad">
                  <div className="container">
                    <div className="name">Short Line</div>
                    {getPosition() === 28 ? (
                      element
                    ) : (
                      <i className="drawing fa fa-subway" />
                    )}
                    <div className="price">Price $200</div>
                  </div>
                </div>
                <div className="space chance">
                  <div className="container">
                    <div className="name">Chance</div>
                    {getPosition() === 29 ? (
                      element
                    ) : (
                      <i className="drawing fa fa-question" />
                    )}
                  </div>
                </div>
                <div className="space property">
                  <div className="container">
                    <div className="color-bar dark-blue" />
                    <div className="name">
                      Park Place
                      {getPosition() === 30 && element}
                    </div>
                    <div className="price">Price $350</div>
                  </div>
                </div>
                <div className="space fee luxury-tax">
                  <div className="container">
                    <div className="name">Luxury Tax</div>
                    {getPosition() === 31 && element}
                    <div className="instructions">Pay $75.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StatsPane currentParticipant />
      </div>
      <Footer />
    </>
  );
};

export default Board;
