import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { RecipesRouter } from "./routes/recipes.js";
import { UserRouter } from "./routes/users.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.use("/auth", UserRouter);
app.use("/recipes", RecipesRouter);

mongoose.connect("mongodb+srv://jaskeerat:recipes321@recipes.zeesiln.mongodb.net/recipes?retryWrites=true&w=majority")

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
   });