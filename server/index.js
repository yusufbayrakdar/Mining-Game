const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
app.use(cors());
let activePlayers = {};
let rooms = [];
app.post("/user/create/:username/:uuid", async (req, res, next) => {
  const { username, uuid } = req.params;
  activePlayers[uuid] = username;
  console.log("activePlayers", activePlayers);
  io.emit("active-players", Object.keys(activePlayers).length);
  res.send({ username, uuid });
});
io.on("connection", socket => {
  socket.on("create-room", ({ uuid }) => {
    const room = {
      ownerName: activePlayers[uuid],
      ownerUuid: uuid,
      gameDuration: 3,
      maxMineSize: 3,
      mineCount: 5,
      playerCount: 1,
      players: [{ name: activePlayers[uuid], uuid }]
    };
    rooms.push(room);
    io.emit("get-rooms", rooms);
    socket.emit("create-room-success", room);
  });

  socket.on("get-rooms", () => {
    socket.emit("get-rooms", rooms);
  });

  socket.on("join-room", ({ roomId, uuid }) => {
    let foundRoom = rooms.find(room => room.ownerUuid === roomId);
    if (foundRoom && foundRoom.playerCount === 1) {
      foundRoom.playerCount++;
      foundRoom.players.push({ name: activePlayers[uuid], uuid });
      socket.emit("join-room-success", foundRoom);
      socket.broadcast.emit("join-room-success", foundRoom);
      io.emit("get-rooms", rooms);
    } else {
      socket.emit("join-room-error", "Cannot join! Room was closed or full.");
    }
  });

  socket.on("start-game", () => {
    socket.broadcast.emit("start-game", "");
  });

  socket.on("move-ship", ({ keyframe, uuid }) => {
    socket.broadcast.emit("move-ship", keyframe);
  });
});

http.listen(3811, function() {
  console.log("listening on port 3811");
});
