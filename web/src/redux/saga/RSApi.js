import helper from "../../helper";
import service from "../../services";
class Api {
  createUser = username => {
    return service.post(`user/create/${username}`);
  };
  getUsers = searchValue => {
    return service.get("/");
  };
  deleteUser = customerId => {
    return service.get("/");
  };

  updateUser = ({ id, name }) => {
    return service.get("/");
  };

  startGame = () => {
    return service.send("start-game", {});
  };

  moveShip = keyframe => {
    return service.send("move-ship", { keyframe });
  };

  createRoom = () => {
    return service.send("create-room", {});
  };

  joinRoom = roomId => {
    return service.send("join-room", { roomId });
  };

  getRooms = () => {
    return service.send("get-rooms", {});
  };
  deleteRoom = customerId => {
    return service.get("/");
  };
  updateRoom = ({ id, name }) => {
    return service.get("/");
  };
}
export default new Api();
