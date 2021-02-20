import { takeLatest, call, put, select, delay } from "redux-saga/effects";
import RSApi from "./RSApi";
import * as $ from "../actionTypes";

const $A = function(type, payload) {
  return { type, payload };
};
const getUsersRequestSaga = function*(action) {
  try {
    const data = yield call(RSApi.getUsers, action.payload);

    yield put($A($.GET_USERS_SUCCESS, data));
  } catch (error) {
    yield put($A($.GET_USERS_FAILURE));
  }
};
const createUserSaga = function*(action) {
  try {
    const { data } = yield call(RSApi.createUser, action.payload);
    yield put($A($.CREATE_USER_SUCCESS, data));
  } catch (error) {
    yield put($A($.CREATE_USER_FAILURE));
  }
};
const deleteUserSaga = function*(action) {
  try {
    yield call(RSApi.deleteUser, action.payload);
    yield put($A($.DELETE_USER_SUCCESS));
    yield put($A($.GET_USERS_REQUEST));
  } catch (error) {
    yield put($A($.DELETE_USER_FAILURE));
  }
};
const updateUserSaga = function*(action) {
  try {
    yield call(RSApi.updateUser, action.payload);
    yield put($A($.UPDATE_USER_SUCCESS));
    yield put($A($.GET_USERS_REQUEST));
  } catch (error) {
    yield put($A($.UPDATE_USER_FAILURE));
  }
};

const getRoomsRequestSaga = function*() {
  try {
    yield call(RSApi.getRooms);
  } catch (error) {
    yield put($A($.GET_ROOMS_FAILURE));
  }
};
const createRoomSaga = function*(action) {
  try {
    yield call(RSApi.createRoom);
  } catch (error) {
    yield put($A($.CREATE_ROOM_FAILURE));
  }
};
const joinRoomSaga = function*(action) {
  try {
    yield call(RSApi.joinRoom, action.payload);
  } catch (error) {
    yield put($A($.JOIN_ROOM_FAILURE));
  }
};
const deleteRoomSaga = function*(action) {
  try {
    yield call(RSApi.deleteRoom, action.payload);
    yield put($A($.DELETE_USER_SUCCESS));
    yield put($A($.GET_USERS_REQUEST));
  } catch (error) {
    yield put($A($.DELETE_USER_FAILURE));
  }
};
const updateRoomSaga = function*(action) {
  try {
    yield call(RSApi.updateUser, action.payload);
    yield put($A($.UPDATE_USER_SUCCESS));
    yield put($A($.GET_USERS_REQUEST));
  } catch (error) {
    yield put($A($.UPDATE_USER_FAILURE));
  }
};

const updateUsernameSaga = function*(action) {
  try {
    yield put($A($.UPDATE_USERNAME_SUCCESS, action.payload));
  } catch (error) {}
};

const startGameSaga = function*(action) {
  try {
    yield call(RSApi.startGame);
  } catch (error) {
    yield put($A($.START_GAME_FAILURE));
  }
};

const moveShipSaga = function*(action) {
  try {
    yield call(RSApi.moveShip, action.payload);
  } catch (error) {
    yield put($A($.START_GAME_FAILURE));
  }
};

// prettier-ignore
export default function* () {
  yield takeLatest($.GET_USERS_REQUEST, getUsersRequestSaga);
  yield takeLatest($.CREATE_USER_REQUEST, createUserSaga);
  yield takeLatest($.DELETE_USER_REQUEST, deleteUserSaga);
  yield takeLatest($.UPDATE_USER_REQUEST, updateUserSaga);
  
  yield takeLatest($.GET_ROOMS_REQUEST, getRoomsRequestSaga);
  yield takeLatest($.JOIN_ROOM_REQUEST, joinRoomSaga);
  yield takeLatest($.CREATE_ROOM_REQUEST, createRoomSaga);
  yield takeLatest($.DELETE_ROOM_REQUEST, deleteRoomSaga);
  yield takeLatest($.UPDATE_ROOM_REQUEST, updateRoomSaga);
  
  yield takeLatest($.UPDATE_USERNAME_REQUEST, updateUsernameSaga);
  
  yield takeLatest($.START_GAME_REQUEST, startGameSaga);
  
  yield takeLatest($.MOVE_SHIP_REQUEST, moveShipSaga);
}
