import mongoose from "mongoose";
import config from "config";

const db_uri = config.get<string>("db_uri");

async function connect() {
  try {
    console.log(db_uri);
    // await mongoose.connect(db_uri);
  } catch (err) {
    console.log("err");
  }
}

export default connect;
