import express from "express";
import config from "config";
import connect from "../config/conn";
import router from "./routes";

const app = express();
const port = config.get<number>("port");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, async () => {
  await connect();
  console.log("Api esta rodando");
});
