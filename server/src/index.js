import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { RecipesRouter } from "./routes/recipes.js";
import { UserRouter } from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const CONNECTION_PASSWORD = process.env.CONNECTION_PASSWORD;

// middlewares
app.use(express.json());
app.use(cors());

app.use("/auth", UserRouter);
app.use("/recipes", RecipesRouter);

mongoose.connect(`mongodb+srv://jaskeerat:${CONNECTION_PASSWORD}@recipes.zeesiln.mongodb.net/recipes?retryWrites=true&w=majority`)

app.listen(PORT, function () {
    console.log('Example app listening on port 4000!');
   });