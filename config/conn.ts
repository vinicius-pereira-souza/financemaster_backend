import mongoose from "mongoose";
import config from "config";

const db_uri = config.get<string>("db_uri");

async function connect() {
  try {
    await mongoose.connect(db_uri);
    console.log("conectado no banco!");
  } catch (err) {
    console.log("err");
  }
}

export default connect;
