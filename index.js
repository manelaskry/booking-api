const express =require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("mongoose")
const mongoose = require("mongoose")

import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();
const port = 3000;

dotenv.config(); //Cela charge les variables d'environnement à partir d'un fichier .env 

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.listen(3000,()=>{
    console.log(port,"server running on port 3000");
})