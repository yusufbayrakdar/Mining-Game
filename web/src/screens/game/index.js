import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import store from "../../redux/configureStore";
import * as $ from "../../redux/actionTypes";
import { Button } from "@material-ui/core";
import Table from "../../components/Table";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCrown } from "@fortawesome/free-solid-svg-icons";
import ocean from "../../assets/ocean.gif";
import greenShip from "../../assets/green_ship.svg";
import redShip from "../../assets/red_ship.svg";
import { color } from "@material-ui/system";
import IdentityCard from "../../components/IdentityCard";
function Rooms() {
  const user = useSelector(state => state.user);
  const { activeRoom, rivalMoveKeyframe } = useSelector(state => state.rooms);
  const { redCoordinates, setRed } = useState([0, 0]);
  const { redPrevCoordinates, setRedPrev } = useState([0, 0]);
  const { greenCoordinates, setGreen } = useState([0, 0]);
  const { greenPrevCoordinates, setGreenPrev } = useState([0, 0]);
  const redShipRef = useRef(null);
  const greenShipRef = useRef(null);
  useEffect(() => {
    console.log("Rooms -> redShipRef.current", redShipRef.current);
    redShipRef.current.classList.add("moveShip");
    console.log("Rooms -> greenShipRef.current", greenShipRef.current);
  }, []);
  useEffect(() => {
    if (Object.keys(rivalMoveKeyframe).length > 0) {
      let styleSheet = document.styleSheets[0];
      styleSheet.insertRule(rivalMoveKeyframe, styleSheet.cssRules.length);
    }
  }, [rivalMoveKeyframe]);
  let styleRed = {
    animationName: "moveRed",
    animationTimingFunction: "ease-in-out",
    animationDuration: "1s",
    animationDelay: "0.0s",
    animationIterationCount: 1,
    animationDirection: "normal",
    animationFillMode: "forwards"
  };
  let styleGreen = {
    animationName: "moveGreen",
    animationTimingFunction: "ease-in-out",
    animationDuration: "1s",
    animationDelay: "0.0s",
    animationIterationCount: 1,
    animationDirection: "normal",
    animationFillMode: "forwards"
  };
  const handleCommandShip = index => {
    let x = index % 10;
    let y = Math.floor(index / 10);
    let styleSheet = document.styleSheets[0];
    let keyframes;
    if (activeRoom.ownerUuid === user.uuid) {
      keyframes = `@keyframes moveRed {
        from {
          transform: translateX(-5px) translateY(0px);
        }
        to {
          transform: translateX(${-5 - 66.7 * (10 - x - 1)}px) translateY(${65 *
        y}px);
        }
      }`;
    } else {
      keyframes = `@keyframes moveGreen {
        from {
          transform: translateX(0px) translateY(0px);
        }
        to {
          transform: translateX(${-66.7 * (10 - x - 1)}px) translateY(${65 *
        y}px);
        }
      }`;
    }
    store.dispatch({
      type: $.MOVE_SHIP_REQUEST,
      payload: keyframes
    });
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  };
  return (
    <Container className="game-container">
      <IdentityCard />
      <Card className="game-card">
        <div className="player-list">
          <div className="bold player-list-title">
            Players {activeRoom.playerCount}/2:
          </div>
          {activeRoom &&
            activeRoom.players &&
            activeRoom.players.map((player, i) => (
              <Row className="player-name medium">
                <FontAwesomeIcon
                  icon={activeRoom.ownerUuid === player.uuid ? faCrown : faUser}
                  className={`player-icon ${i === 0 ? "red" : "green"}`}
                />
                <div key={player.uuid}>{player.name}</div>
              </Row>
            ))}
        </div>
        <div className="game-section">
          <div className="info-bar"></div>
          <div className="game-screen">
            <img src={ocean} className="ocean"></img>
            <div className="gridMap">
              {[...Array(100).keys()].map(i => (
                <div
                  style={{
                    gridArea: `grid-${i}`,
                    border: "1px solid white",
                    width: "100%",
                    height: "100%",
                    position: "relative"
                  }}
                  key={i}
                  onClick={() => {
                    handleCommandShip(i);
                  }}
                >
                  <div className="grid-id bold">{i}</div>
                  {i === 9 && (
                    <>
                      <img
                        src={greenShip}
                        className="player-1"
                        id="game-ship-1"
                        ref={greenShipRef}
                        style={styleGreen}
                      ></img>
                      <img
                        src={redShip}
                        className="player-2"
                        id="game-ship-2"
                        ref={redShipRef}
                        style={styleRed}
                      ></img>
                    </>
                  )}
                  <div className="water-depth bold">{i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}

export default Rooms;
