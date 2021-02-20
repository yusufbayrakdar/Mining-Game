import * as $ from "../actionTypes";

const initialState = {
  users: [],
  activePlayers: 0,
  username: "",
  uuid: "",

  getUsersInProgress: false,
  getUsersFailed: false,
  getUsersCompleted: false,

  createUserInProgress: false,
  createUserFailed: false,
  createUserCompleted: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case $.GET_USERS_REQUEST:
      return {
        ...state,
        getUsersInProgress: true,
        getUsersFailed: false,
        getUsersCompleted: false
      };
    case $.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        getUsersInProgress: false,
        getUsersFailed: false,
        getUsersCompleted: true
      };
    case $.GET_USERS_FAILURE:
      return {
        ...state,
        getUsersInProgress: false,
        getUsersFailed: true,
        getUsersCompleted: false
      };
    case $.GET_USERS_RESET:
      return {
        ...state,
        getUsersInProgress: false,
        getUsersFailed: true,
        getUsersCompleted: false
      };
    case $.CREATE_USER_REQUEST:
      return {
        ...state,
        createUserInProgress: true,
        createUserFailed: false,
        createUserCompleted: false
      };
    case $.CREATE_USER_SUCCESS:
      localStorage.setItem("mining-game-playername", payload.username);
      return {
        ...state,
        username: payload.username,
        uuid: payload.uuid,
        createUserInProgress: false,
        createUserFailed: false,
        createUserCompleted: true
      };
    case $.CREATE_USER_FAILURE:
      return {
        ...state,
        createUserInProgress: false,
        createUserFailed: true,
        createUserCompleted: false
      };
    case $.CREATE_USER_RESET:
      return {
        ...state,
        createUserInProgress: false,
        createUserFailed: true,
        createUserCompleted: false
      };

    case $.UPDATE_USERNAME_SUCCESS:
      return {
        ...state,
        username: payload.username,
        uuid: payload.uuid
      };
    case $.GET_ACTIVE_PLAYERS:
      return {
        ...state,
        activePlayers: payload
      };

    default:
      return state;
  }
};
