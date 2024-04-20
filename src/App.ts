import { config } from "dotenv";
import express from "express";
import { connectDb } from "./DB/connection";
import cors from "cors";
import { routerApi } from "./routes/routerApi";

connectDb();

config();

const App = express();
App.use(cors());
App.use(express.json());

const port = process.env.PORT || 5500;

routerApi(App);

App.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
