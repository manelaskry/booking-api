import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.js"

const app = express();
dotenv.config(); //Cela charge les variables d'environnement à partir d'un fichier .env 

//db
const db_connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("connect to mongoDB")
    } catch (error){
        throw error
    }
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(8800,()=>{
    db_connect();
    console.log( "server running on port 8800");
})