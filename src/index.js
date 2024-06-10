import app from "./app.js";
import { connect, disconnect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connecToDatabase() {
  try {
    await connect(process.env.DB_CONNECT);
  } catch (error) {
    console.log(error);
    throw new Error("Could not to Connect TO MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

const PORT = process.env.PORT || 5000;

connecToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server Open & Connected To Database 🤟")
    );
  })
  .catch((err) => console.log(err));
