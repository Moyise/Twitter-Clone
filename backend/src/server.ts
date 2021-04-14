import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import { Server, Socket } from "socket.io";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./config/db";
import { typeDefs } from "./config/typeDefs";
import { resolvers } from "./config/resolvers";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Api routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);

//

if (process.env.NODE_ENV === "production") {
  const root = path.join("build");
  //  console.log(root);
  app.use(express.static(root));

  app.get("*", (req, res) => res.sendFile("index.html", { root }));
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

const appServer = app.listen(PORT, () =>
  console.log(
    `Twitter app listening on port ${PORT}. Now browse to http://localhost:${PORT}${server.graphqlPath}`
  )
);

const io = new Server(appServer, { pingTimeout: 60000 });

io.on("connection", (socket: Socket) => {
  console.log("New user connected");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join_room", (room) => socket.join(room));
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("notification received", (room) =>
    socket.in(room).emit("notification received")
  );

  socket.on("new message", (newMessage) => {
    const chat = newMessage.chat;

    if (!chat.users) return console.log("Chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user._id == newMessage.sender._id) return;

      socket.in(user._id).emit("message received", newMessage);
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
