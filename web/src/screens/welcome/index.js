import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "../../../node_modules/react-router-dom";
import { useSelector } from "react-redux";
import YsInput from "../../components/YsInput";
import store from "../../redux/configureStore";
import * as $ from "../../redux/actionTypes";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3811");
function Welcome() {
  const history = useHistory();
  const { username, createUserFailed, createUserCompleted } = useSelector(
    state => state.user
  );
  const [tempUsername, setUsername] = useState("");
  const registerPlayer = () => {
    store.dispatch({
      type: $.CREATE_USER_REQUEST,
      payload: tempUsername
    });
  };
  useEffect(() => {
    if (!createUserFailed && createUserCompleted) {
      history.push("/rooms");
    }
  }, [username]);
  return (
    <div className="welcome">
      <Container className="welcome-container">
        <Card className="welcome-card">
          <YsInput
            icon="fas fa-user"
            placeholder="Player"
            theFunction={setUsername}
            value={tempUsername}
            className="playername-input"
          />
          <Button
            className="register-btn"
            variant="outlined"
            color="primary"
            onClick={() => {
              registerPlayer();
            }}
          >
            Play
          </Button>
        </Card>
      </Container>
    </div>
  );
}

export default Welcome;
