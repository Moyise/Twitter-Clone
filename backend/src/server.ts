import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import { ApolloServer } from "apollo-server-express";
import connectDB from "./config/db";
import { typeDefs } from "./config/typeDefs";
import { resolvers } from "./config/resolvers";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
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

app.listen(PORT, () =>
  console.log(
    `Twitter app listening on port ${PORT}. Now browse to http://localhost:${PORT}${server.graphqlPath}`
  )
);
