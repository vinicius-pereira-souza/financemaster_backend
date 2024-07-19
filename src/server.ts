import express from "express";
import config from "config";
import connect from "../config/conn";
import router from "./routes";
import cors from "cors";

const app = express();
const port = config.get<number>("port");
const clientOrigin = config.get<string>("client_origin");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(cors({ credentials: true, origin: clientOrigin }));

app.listen(port, async () => {
  await connect();
  console.log("Api esta rodando");
});
