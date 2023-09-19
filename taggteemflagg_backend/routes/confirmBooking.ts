import { Client, TravelMode, UnitSystem } from "@googlemaps/google-maps-services-js";
import { Request, Response } from 'express';
import { DataSource } from "typeorm";

import { MapCoordinate } from "../entities/MapCoordinate.js";
import { ConfirmedBooking } from "../entities/ConfirmedBooking.js";

const client = new Client({});

export const confirmBooking = async (req: Request, res: Response, connection: DataSource) => {
    const { confirmedBooking }: { confirmedBooking: ConfirmedBooking } = req.body;

    console.log("Calling confirmBooking.confirmBooking");

    try {
        const confirmedBookingRepository = connection.getRepository(ConfirmedBooking);
        await confirmedBookingRepository.save(confirmedBooking);
    
        return res.json({ });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching directions.", success: false, error: err });
    }
};

export default confirmBooking;