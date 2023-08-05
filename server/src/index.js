import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { RecipesRouter } from "./routes/recipes.js";
import { UserRouter } from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const CONNECTION_URL = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(CONNECTION_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


// middlewares
app.use(express.json());
app.use(cors());

app.use("/auth", UserRouter);
app.use("/recipes", RecipesRouter);

connectDB().then(() => {
    app.listen(PORT, function () {
        console.log('Example app listening on port 4000!');
    });
})