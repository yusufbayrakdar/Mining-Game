import isDev from "../node_modules/isdev";
const APP = {
  development: { API_PATH: `http://localhost:3811` },
  production: { API_PATH: `https://mining-game.herokuapp.com` }
};

const APP_CONFIG = APP[isDev ? "development" : "production"]; // CHANGE HERE

export default APP_CONFIG;
