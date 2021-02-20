import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "../../../node_modules/react-router-dom";
import store from "../../redux/configureStore";
import * as $ from "../../redux/actionTypes";
import Table from "../../components/Table";
import { Button } from "@material-ui/core";
import IdentityCard from "../../components/IdentityCard";
import { useSelector } from "react-redux";
function Rooms() {
  const history = useHistory();
  const user = useSelector(state => state.user);
  const {
    roomList,
    getRoomsFailed,
    getRoomsCompleted,
    joinSuccess
  } = useSelector(state => state.rooms);
  const [isCreatedRoom, setIsCreatedRoom] = useState(false);
  const createRoom = () => {
    if (user.uuid) {
      store.dispatch({
        type: $.CREATE_ROOM_REQUEST,
        payload: user.uuid
      });
      setIsCreatedRoom(true);
    }
  };
  const join = roomId => {
    if (user.uuid) {
      store.dispatch({
        type: $.JOIN_ROOM_REQUEST,
        payload: roomId
      });
    }
  };
  useEffect(() => {
    store.dispatch({
      type: $.GET_ROOMS_REQUEST
    });
    if (
      (isCreatedRoom && !getRoomsFailed && getRoomsCompleted) ||
      joinSuccess
    ) {
      history.push("/game-lobi");
      setIsCreatedRoom(false);
    }
  }, [isCreatedRoom, joinSuccess]);
  return (
    <div className="welcome">
      <IdentityCard />
      <Container className="welcome-container">
        <Card className="rooms-card">
          <Table
            columns={[
              "Owner",
              "Players",
              "Game Duration",
              "Max Mine Size",
              "Mine Count"
            ]}
            dbColumns={[
              "ownerName",
              "playerCount",
              "gameDuration",
              "maxMineSize",
              "mineCount"
            ]}
            data={roomList}
            join={join}
            tableName="Rooms"
            className="rooms"
          />
          <Button
            className="create-room"
            variant="outlined"
            color="primary"
            onClick={() => {
              createRoom();
            }}
          >
            Create Room
          </Button>
        </Card>
      </Container>
    </div>
  );
}

export default Rooms;
