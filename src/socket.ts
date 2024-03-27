import { Server, Socket } from "socket.io";
const io = new Server({
  pingTimeout: 60000,
  cors: {
    origin: ["https://guidemebro-rho.vercel.app"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userId) => {
    socket.join(userId);
    socket.emit("connected");
  });
  socket.on("join-chat", (room) => {
    socket.join(room);
    socket.in(room).emit("remote-user-joined", { from: socket.id });
  });
  socket.on("leave-chat", (room) => {
    socket.in(room).emit("remote-user-left");
    socket.leave(room);
  });
  //Real time typing indicator
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop-typing", (room) => {
    socket.in(room).emit("stop-typing");
  });

  // Real time messaging
  socket.on("new-message", ({ message, notification }) => {
    let chat = message.chat;

    if (!chat.users) return;

    chat.users.forEach((user: any) => {
      if (user._id === message.sender._id) return;

      socket.in(user._id).emit("message-recieved", { message, notification });
    });
  });
});
