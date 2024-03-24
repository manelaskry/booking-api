import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register = async(req,res,next) => {
    try{
        const salt= bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = User ({
            ...req.body,
            password : hash,
        })

        res.status(200).send("user has been created");
    }catch(error){
        next(error);
    }
};
