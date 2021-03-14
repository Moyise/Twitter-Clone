import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  const root = path.join("build");
  //  console.log(root);
  app.use(express.static(root));

  app.get("*", (req, res) => res.sendFile("index.html", { root }));
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.listen(PORT, () => console.log(`Twitter app listening on port ` + PORT));
