import { Server } from "socket.io";

const io = new Server(2999, { cors: { allowedHeaders: "*", origin: "*" } });

io.on("connection", (socket) => {
  let username = `User ${Math.round(Math.random() * 999999)}`;
  socket.emit("name", username);

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", {
      from: username,
      message: message,
      time: new Date().toLocaleString(),
    });
  });
});

io.listen(3000);
