import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import usersRoutes from "./routes/users.js";
import cors from "cors";

const app = express();
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/gli").then(() => {
  console.log("Mongodb connected");
});

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Homepage");
});
app.use("/users", usersRoutes);

app.listen(PORT, () =>
  console.log(`SERVER RUNNING ON PORT: http://localhost:${PORT}`)
);
