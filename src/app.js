import express from "express";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import apiRoute, { apiProtected } from "./routes/api.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api", apiRoute);
app.use("/api", AuthMiddleware, apiProtected);

export default app;
