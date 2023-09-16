import { Client, TravelMode, UnitSystem } from "@googlemaps/google-maps-services-js";
import { Request, Response } from 'express';

import { MapCoordinate } from "../entities/MapCoordinate.ts";
import { DataSource } from "typeorm";
import { ConfirmedBooking } from "../entities/ConfirmedBooking.ts";

const client = new Client({});

export const confirmBooking = async (req: Request, res: Response, connection: DataSource) => {
    const { confirmedBooking }: { confirmedBooking: ConfirmedBooking } = req.body;

    console.log("Calling confirmBooking.confirmBooking");

    try {

        return res.json({ });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching directions.", success: false, error: err });
    }
};

export default confirmBooking;