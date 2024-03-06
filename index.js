const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");


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

app.listen(8800,()=>{
    db_connect();
    console.log( "server running on port 8800");
})