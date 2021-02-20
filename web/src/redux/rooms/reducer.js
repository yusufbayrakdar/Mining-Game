import * as $ from "../actionTypes";

const initialState = {
  roomList: [],
  activeRoom: {},

  getRoomsInProgress: false,
  getRoomsFailed: false,
  getRoomsCompleted: false,

  createRoomInProgress: false,
  createRoomFailed: false,
  createRoomCompleted: false,

  joinSuccess: false,
  startGame: false,
  rivalMoveKeyframe: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case $.GET_ROOMS_REQUEST:
      return {
        ...state,
        getRoomsInProgress: true,
        getRoomsFailed: false,
        getRoomsCompleted: false
      };
    case $.GET_ROOMS_SUCCESS:
      return {
        ...state,
        roomList: payload,
        getRoomsInProgress: false,
        getRoomsFailed: false,
        getRoomsCompleted: true
      };
    case $.GET_ROOMS_FAILURE:
      return {
        ...state,
        getRoomsInProgress: false,
        getRoomsFailed: true,
        getRoomsCompleted: false
      };
    case $.GET_ROOMS_RESET:
      return {
        ...state,
        getRoomsInProgress: false,
        getRoomsFailed: true,
        getRoomsCompleted: false
      };
    case $.CREATE_ROOM_REQUEST:
      return {
        ...state,
        createRoomInProgress: true,
        createRoomFailed: false,
        createRoomCompleted: false
      };
    case $.CREATE_ROOM_SUCCESS:
      return {
        ...state,
        activeRoom: payload,
        createRoomInProgress: false,
        createRoomFailed: false,
        createRoomCompleted: true
      };
    case $.CREATE_ROOM_FAILURE:
      return {
        ...state,
        createRoomInProgress: false,
        createRoomFailed: true,
        createRoomCompleted: false
      };
    case $.CREATE_ROOM_RESET:
      return {
        ...state,
        createRoomInProgress: false,
        createRoomFailed: true,
        createRoomCompleted: false
      };

    case $.JOIN_ROOM_SUCCESS:
      return {
        ...state,
        activeRoom: payload,
        joinSuccess: true
      };
    case $.JOIN_ROOM_FAILURE:
      return {
        ...state,
        joinSuccess: false
      };

    case $.START_GAME_SUCCESS:
      return {
        ...state,
        startGame: true
      };
    case $.JOIN_ROOM_FAILURE:
      return {
        ...state,
        startGame: false
      };

    case $.MOVE_SHIP_SUCCESS:
      return {
        ...state,
        rivalMoveKeyframe: payload
      };

    default:
      return state;
  }
};
