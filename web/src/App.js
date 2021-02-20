import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from "../node_modules/react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import Welcome from "./screens/welcome";
import Rooms from "./screens/rooms";
import Lobi from "./screens/lobi";
import Game from "./screens/game";
import "./App.css";

function App() {
  return (
    <div style={{ height: "calc(100vh - 57px)" }}>
      <CookiesProvider>
        <Provider store={store}>
          <BrowserRouter className="App">
            <div className="background-blue-layer" />
            <Switch>
              <Route
                exact
                path="/welcome"
                render={props => <Welcome {...props} />}
              />
              <Route
                exact
                path="/rooms"
                render={props => <Rooms {...props} />}
              />
              <Route
                exact
                path="/game-lobi"
                render={props => <Lobi {...props} />}
              />
              <Route exact path="/game" render={props => <Game {...props} />} />
              <Redirect exact from="/" to="/welcome" />
            </Switch>
          </BrowserRouter>
        </Provider>
      </CookiesProvider>
    </div>
  );
}

export default App;
