import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import store from "../../redux/configureStore";
import * as $ from "../../redux/actionTypes";
import { Button } from "@material-ui/core";
import Table from "../../components/Table";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "../../../node_modules/react-router-dom";
import { faUser, faCrown } from "@fortawesome/free-solid-svg-icons";
import IdentityCard from "../../components/IdentityCard";
function Rooms() {
  const { uuid } = useSelector(state => state.user);
  const history = useHistory();
  const { activeRoom, startGame } = useSelector(state => state.rooms);
  useEffect(() => {
    if (startGame) {
      history.push("/game");
    }
  }, [startGame]);
  return (
    <Container className="lobi-container">
      <IdentityCard />
      <Card className="game-lobi-card">
        <div className="player-list">
          <div className="bold player-list-title">
            Players {activeRoom.playerCount}/2:
          </div>
          {activeRoom &&
            activeRoom.players &&
            activeRoom.players.map(player => (
              <Row className="player-name medium">
                <FontAwesomeIcon
                  icon={activeRoom.ownerUuid === player.uuid ? faCrown : faUser}
                  className="player-icon"
                />
                <div key={player.uuid}>{player.name}</div>
              </Row>
            ))}
        </div>
        <Col className="game-settings">
          <Row>
            <Col className="bold">Duration:</Col>
            <Col className="medium">
              <select>
                <option>{activeRoom.gameDuration} min</option>
                <option>4 min</option>
                <option>5 min</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col className="bold">Maximum Mine Size:</Col>
            <Col className="medium">
              <select>
                <option>{activeRoom.maxMineSize}</option>
                <option>4</option>
                <option>5</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col className="bold">Mine Count:</Col>
            <Col className="medium">
              <select>
                <option>3</option>
                <option>4</option>
                <option>{activeRoom.mineCount}</option>
                <option>6</option>
              </select>
            </Col>
          </Row>
        </Col>
        <Button
          className="start-game-btn"
          variant="outlined"
          color="primary"
          onClick={() => {
            store.dispatch({
              type: $.START_GAME_REQUEST
            });
            history.push("/game");
          }}
          disabled={
            activeRoom.playerCount !== 2 || activeRoom.ownerUuid !== uuid
          }
        >
          Start Game
        </Button>
      </Card>
    </Container>
  );
}

export default Rooms;
