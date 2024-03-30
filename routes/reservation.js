import express from "express";
const router = express.Router();

import { createReservation } from "../controllers/reservation.js";

router.post("/createres", createReservation);

export default router;