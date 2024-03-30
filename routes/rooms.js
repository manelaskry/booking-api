import express from "express";
const router = express.Router();

import { createRoom } from "../controllers/room.js";

router.post("/createroom", createRoom);

export default router;