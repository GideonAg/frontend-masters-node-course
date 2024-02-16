import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import { protectRoutes } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(cors()); // makes your api accessible to clients depending on your specification. all clients are allowed by default.
app.use(morgan("dev")); // logs endpoints that was called to the console
app.use(express.json()); // enables the server to receive request containing json from clients.
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Jesus saves" });
  next();
});

app.get("/error", (req, res, next) => {
  setTimeout(() => {
    next(new Error("had an error here"));
  }, 1000);
});

app.use("/api", protectRoutes, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops, something went wrong." });
  }
});

export default app;
