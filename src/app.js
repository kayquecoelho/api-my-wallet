import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.listen(5000, () => {
  console.log("Server is listening on port 5000.")
});