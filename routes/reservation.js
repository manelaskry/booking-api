import express from "express";
const router = express.Router();

import { createReservation } from "../controllers/reservation.js";
import { verifyToken } from "../utils/verifyToken.js";


router.post("/createres",verifyToken, createReservation);

export default router;