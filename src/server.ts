//Server
import "dotenv/config";
//Express
import express from "express";
//Routes
import router from "./router";
//CORS
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
