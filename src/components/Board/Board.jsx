import React, { useState } from "react";
import "./Board.css";
import StatsPane from "../Stats/StatsPane";
import { useParticipants } from "../../contexts/ParticipantContext";

const Board = () => {
  const [position, setPosition] = useState(0);
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const [, updateState] = React.useState();
  const { participants } = useParticipants();
  console.log(participants);
  function rollDice() {
    // d1 - temporary dice1 variable
    const d1 = Math.ceil(Math.random() * 6);

    //d2 - temporary dice2 variable
    const d2 = Math.ceil(Math.random() * 6);

    setPosition((pos) => {
      return (d1 + d2 + pos) % 32;
    });

    setDice1(d1);
    setDice2(d2);
  }
  function getPosition() {
    return position;
  }
  const element = <div>coin</div>;
  return (
    <div className="wrapper">
      <div className="board-container">
        <div className="table">
          <div className="board">
            <div className="center">
              {/* <div className="community-chest-deck">
                <h2 className="label">Community Chest</h2>
                <div className="deck" />
              </div> */}
              <h1 className="title">Cyber Conquest</h1>
              <div className="card-details">
                <h1>
                  Card
                  <br />
                  Details
                </h1>
              </div>
              <div className="dice-container" onClick={rollDice}>
                <h1>🎲</h1>
                {dice1 && <p>{dice1}</p>},{dice2 && <p>{dice2}</p>}
                <br />
                <p>{position}</p>
              </div>
              {/* <div className="chance-deck">
                <h2 className="label">Chance</h2>
                <div className="deck" />
              </div> */}
            </div>
            <div className="space corner go">
              <div className="container">
                <div className="instructions">
                  Collect $200.00 salary as you pass
                </div>
                {getPosition() === 0 && element}
                <div className="go-word">go</div>
              </div>
              <div className="arrow fa fa-long-arrow-left" />
            </div>
            <div className="row horizontal-row bottom-row">
              <div className="space property">
                <div className="container">
                  <div className="color-bar light-blue" />
                  <div className="name">Connecticut Avenue</div>
                  {getPosition() === 7 && element}
                  <div className="price">PRICE $120</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar light-blue" />
                  <div className="name">Vermont Avenue</div>
                  {getPosition() === 6 && element}
                  <div className="price">Price $100</div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Chance</div>
                  {getPosition() === 5 ? (
                    element
                  ) : (
                    <i className="drawing fa fa-question" />
                  )}
                </div>
              </div>
              <div className="space railroad">
                <div className="container">
                  <div className="name">Reading Railroad</div>
                  {getPosition() === 4 ? (
                    element
                  ) : (
                    <i className="drawing fa fa-subway" />
                  )}
                  <div className="price">Price $200</div>
                </div>
              </div>
              <div className="space fee income-tax">
                <div className="container">
                  <div className="name">Income Tax</div>
                  <div className="diamond" />
                  {getPosition() === 3 ? (
                    element
                  ) : (
                    <div className="instructions">
                      Pay 10%
                      <br />
                      or
                      <br />
                      $200
                    </div>
                  )}
                </div>
              </div>
              <div className="space community-chest">
                <div className="container">
                  <div className="name">Community Chest</div>
                  {getPosition() !== 2 && <i className="drawing fa fa-cube" />}
                  {getPosition() === 2 && element}
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
                  </div>
                  {getPosition() === 1 && element}
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
                    {getPosition() === 8 ? (
                      element
                    ) : (
                      <i className="person fa fa-frown-o" />
                    )}
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
                  <div className="name">Tennessee Avenue</div>
                  {getPosition() === 15 && element}
                  <div className="price">Price $180</div>
                </div>
              </div>
              <div className="space community-chest">
                <div className="container">
                  <div className="name">Community Chest</div>
                  {getPosition() === 14 ? (
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
                  <div className="color-bar orange" />
                  <div className="name">St. James Avenue</div>
                  {getPosition() === 13 && element}
                  <div className="price">Price $180</div>
                </div>
              </div>
              <div className="space railroad">
                <div className="container">
                  <div className="name long-name">Pennsylvania Railroad</div>
                  {getPosition() === 12 ? (
                    element
                  ) : (
                    <i className="drawing fa fa-subway" />
                  )}
                  <div className="price">Price $200</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar purple" />
                  <div className="name">States Avenue</div>
                  {getPosition() === 11 && element}
                  <div className="price">Price $140</div>
                </div>
              </div>
              <div className="space utility electric-company">
                <div className="container">
                  <div className="name">Electric Company</div>
                  {getPosition() === 10 ? (
                    element
                  ) : (
                    <i className="drawing fa fa-lightbulb-o" />
                  )}
                  <div className="price">Price $150</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar purple" />
                  <div className="name">St. Charles Place</div>
                  {getPosition() === 9 && element}
                  <div className="price">Price $140</div>
                </div>
              </div>
            </div>
            <div className="space corner free-parking">
              <div className="container">
                <div className="name">Free</div>
                {getPosition() === 16 ? (
                  element
                ) : (
                  <i className="drawing fa fa-car" />
                )}
                <div className="name">Parking</div>
              </div>
            </div>
            <div className="row horizontal-row top-row">
              <div className="space property">
                <div className="container">
                  <div className="color-bar red" />
                  <div className="name">Kentucky Avenue</div>
                  {getPosition() === 17 && element}
                  <div className="price">Price $220</div>
                </div>
              </div>
              <div className="space chance">
                <div className="container">
                  <div className="name">Chance</div>
                  {getPosition() === 18 ? (
                    element
                  ) : (
                    <i className="drawing fa fa-question blue" />
                  )}
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar red" />
                  <div className="name">Indiana Avenue</div>
                  {getPosition() === 19 && element}
                  <div className="price">Price $220</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar red" />
                  <div className="name">Illinois Avenue</div>
                  {getPosition() === 20 && element}
                  <div className="price">Price $200</div>
                </div>
              </div>
              <div className="space railroad">
                <div className="container">
                  <div className="name">B &amp; O Railroad</div>
                  {getPosition() === 21 ? (
                    element
                  ) : (
                    <i className="drawing fa fa-subway" />
                  )}
                  <div className="price">Price $200</div>
                </div>
              </div>
              <div className="space utility waterworks">
                <div className="container">
                  <div className="name">Waterworks</div>
                  <div className="space property"></div>
                  {getPosition() === 22 ? (
                    element
                  ) : (
                    <i className="drawing fa fa-tint" />
                  )}
                  <div className="price">Price $120</div>
                </div>
              </div>
              <div className="space property">
                <div className="container">
                  <div className="color-bar yellow" />
                  <div className="name">Marvin Gardens</div>
                  {getPosition() === 23 && element}
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
                  </div>
                  {getPosition() === 25 && element}
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
                  <div className="name long-name">Pennsylvania Avenue</div>
                  {getPosition() === 27 && element}
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
                  <div className="name">Park Place</div>
                  {getPosition() === 30 && element}
                  <div className="price">Price $350</div>
                </div>
              </div>
              <div className="space fee luxury-tax">
                <div className="container">
                  <div className="name">Luxury Tax</div>
                  <div className="drawing fa fa-diamond" />
                  {getPosition() === 31 && element}
                  <div className="instructions">Pay $75.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StatsPane />
    </div>
  );
};

export default Board;
