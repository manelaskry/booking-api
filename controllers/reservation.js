import Room from "../models/Room.js";
import Reservation from "../models/Reservation.js"; // Supposons que vous avez un modèle de réservation

export const createReservation = async (req, res, next) => {
    const { roomId, startTime, endTime } = req.body;

    try {
        // Récupérer la salle de réunion spécifique à partir de la base de données
        const room = await Room.findById(roomId);

        // Vérifier si la salle de réunion existe
        if (!room) {
            return res.status(404).json({ message: "La salle de réunion spécifiée n'existe pas." });
        }

        // Ajouter la plage horaire réservée aux dates non disponibles de la salle de réunion
        const reservedDates = getDatesBetween(startTime, endTime); // Fonction pour obtenir les dates entre startTime et endTime
        room.unavailableDates.push(...reservedDates);

        // Enregistrer les modifications de la salle de réunion mise à jour dans la base de données
        await room.save();

        // Créer et enregistrer la réservation dans le modèle de réservation
        const reservation = new Reservation({
            Room: roomId,
            startTime,
            endTime
        });
        await reservation.save();

        // Répondre avec la réservation créée
        res.status(200).json(reservation);
    } catch (error) {
        next(error);
    }
};


// Fonction pour obtenir les dates entre startTime et endTime (non implémentée)

    function getDatesBetween(startTime, endTime) {
        const dates = [];
        let currentDate = new Date(startTime);
    
        while (currentDate <= new Date(endTime)) {
            dates.push(currentDate.toISOString().slice(0, 10)); // Formatage de la date au format ISO (YYYY-MM-DD)
            currentDate.setDate(currentDate.getDate() + 1); // Passage à la prochaine date
        }
    
        return dates;
    }
    
