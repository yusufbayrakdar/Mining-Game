import config from "../env-config";
import io from "socket.io-client";
import { v4 as generateUuid } from "uuid";
import store from "../redux/configureStore";
import * as $ from "../redux/actionTypes";
import axios from "axios";
const socket = io.connect(config.API_PATH);
const privateKey = generateUuid();
class Service {
  constructor() {
    socket.on("active-players", activePlayersCount => {
      store.dispatch({
        type: $.GET_ACTIVE_PLAYERS,
        payload: activePlayersCount
      });
    });
    socket.on("get-rooms", rooms => {
      store.dispatch({
        type: $.GET_ROOMS_SUCCESS,
        payload: rooms
      });
    });
    socket.on("join-room-error", errorMessage => {
      console.error(errorMessage);
      store.dispatch({
        type: $.JOIN_ROOM_FAILURE
      });
    });
    socket.on("join-room-success", activeRoom => {
      console.log("succes");
      store.dispatch({
        type: $.JOIN_ROOM_SUCCESS,
        payload: activeRoom
      });
    });

    socket.on("create-room-success", room => {
      store.dispatch({
        type: $.CREATE_ROOM_SUCCESS,
        payload: room
      });
    });

    socket.on("start-game", () => {
      store.dispatch({
        type: $.START_GAME_SUCCESS
      });
    });

    socket.on("move-ship", keyframe => {
      store.dispatch({
        type: $.MOVE_SHIP_SUCCESS,
        payload: keyframe
      });
    });
  }
  send = (endpoint, payload) => {
    socket.emit(endpoint, { ...payload, uuid: privateKey });
  };
  get = (endpoint, options) => {
    return axios.get(
      `${config.API_PATH}/${endpoint}${options ? `?${options}` : ""}`
    );
  };
  post = (endpoint, payload) => {
    console.log("Service -> post -> payload", payload);
    return axios.post(`${config.API_PATH}/${endpoint}/${privateKey}`);
  };
}
export default new Service();
