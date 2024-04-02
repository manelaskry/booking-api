import Room from "../models/Room.js";
import { createError } from "../utils/error.js";


export const createRoom = async (req, res, next) => {

    try {
        const defaultUnavailableDates = []; 
     
        const newRoom = new Room({
            ...req.body,
            unavailableDates: defaultUnavailableDates 
        }); 

        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
};
