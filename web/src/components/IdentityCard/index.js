import React, { useState, useEffect } from "react";
import "./index.css";
import { useSelector } from "react-redux";
import store from "../../redux/configureStore";
import * as $ from "../../redux/actionTypes";
function YsIdentityCard() {
  const { username } = useSelector(state => state.user);
  const [currentUsername, setUsername] = useState("");
  const remember = localStorage.getItem("mining-game-playername");
  useEffect(() => {
    setUsername(username || (remember && remember.username));
    if (username && username.length < 1 && remember) {
      store.dispatch({
        type: $.UPDATE_USERNAME_REQUEST,
        payload: remember
      });
    }
  }, [username]);
  return currentUsername ? (
    <div className="YsIdentityCard">{currentUsername}</div>
  ) : (
    <div />
  );
}

export default YsIdentityCard;
