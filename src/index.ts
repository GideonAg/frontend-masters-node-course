import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";
import app from "./server";

process.on("uncaughtException", () => {
  console.log("un uncaught exception occured");
});

process.on("unhandledRejection", () => {
  console.log("un unhandled rejection occured");
});

app.listen(config.port, () => {
  console.log(`hello from this side http://localhost:${config.port}`);
});
