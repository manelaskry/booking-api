import Room from "../models/Room.js";
import Reservation from "../models/Reservation.js";
import { verifyToken } from "../utils/verifyToken.js";


export const createReservation = async (req, res, next) => {
    const { roomId, startTime, endTime } = req.body;

    try {
        verifyToken(req, res, async () => {
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).send("Room not found");
        }

        const existingReservation = await Reservation.findOne({
            room: roomId,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Check if there is any overlapping reservation
                {
                    $and: [
                        { startTime: { $gte: startTime, $lte: endTime } },
                        { endTime: { $gte: startTime, $lte: endTime } }
                    ]
                }
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ message: "Room is not available for the specified time period" });
        }

        const reservedDates = getDatesBetween(startTime, endTime);
        room.unavailableDates.push(...reservedDates);
        await room.save();

        const reservation = new Reservation({
            room: roomId,
            startTime,
            endTime
        });
        await reservation.save();

        res.status(200).json(reservation);
    });
    } catch (error) {
        next(error);
    }
};

function getDatesBetween(startTime, endTime) {
    const dates = [];
    let currentDate = new Date(startTime);

    while (currentDate <= new Date(endTime)) {
        dates.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}
