import Room from "../models/Room.js";
import { createError } from "../utils/error.js";


export const createRoom = async (req, res, next) => {
    const { roomNumber, capacity, equipment } = req.body;

    try {
        // Dates non disponibles par défaut pour une nouvelle salle de réunion
        const defaultUnavailableDates = [""]; // Exemple de dates non disponibles par défaut

        // Créer une nouvelle salle de réunion avec les détails fournis et les dates non disponibles par défaut
        const newRoom = new Room({
            roomNumber,
            capacity,
            equipment,
            unavailableDates: defaultUnavailableDates // Utiliser les dates non disponibles par défaut
        });

        // Enregistrer la nouvelle salle de réunion dans la base de données
        const savedRoom = await newRoom.save();

        // Répondre avec la salle de réunion créée
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
};
