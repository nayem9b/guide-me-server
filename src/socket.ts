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

    // Calling
    socket.on("local-user-joined", ({ to }) => {
      io.to(to).emit("local-user-joined", { from: socket.id });
    });
  
    socket.on("call-remote-user", ({ to, offer, isVideoCall }) => {
      io.to(to).emit("incoming-call", { from: socket.id, offer, isVideoCall });
    });
  
    socket.on("call-accepted", ({ answer, to }) => {
      io.to(to).emit("call-accepted", { from: socket.id, answer });
    });
  
    socket.on("call-rejected", ({ to }) => {
      io.to(to).emit("call-rejected");
    });
  
    socket.on("nego-needed", ({ offer, to }) => {
      io.to(to).emit("nego-incoming", { from: socket.id, offer });
    });
  
    socket.on("nego-done", ({ answer, to }) => {
      io.to(to).emit("nego-final", { from: to, answer });
    });
  
    socket.on("end-call", ({ to }) => {
      io.to(to).emit("call-ended");
    });
  
    // socket.on("error", ({ to }) => {
    //   io.to(to).emit("error-occured");
    // });
  
    socket.on("miss-call", ({ to, from }) => {
      socket.in(to).emit("call-missed", { from });
    });



});
