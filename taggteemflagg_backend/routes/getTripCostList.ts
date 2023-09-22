import { Client, TravelMode, UnitSystem } from "@googlemaps/google-maps-services-js";
import { Request, Response } from 'express';
import { DataSource } from "typeorm";

import { MapCoordinate } from "../entities/MapCoordinate.js";

const client = new Client({});

export const tripCostList = async (req: Request, res: Response, connection: DataSource) => {
    const { source, destination }: { source: MapCoordinate, destination: MapCoordinate } = req.body;

    console.log("Calling getTripCostLists.tripCostList");

    try {
        const response = await client.directions({
            params: {
                origin: `${source.latitude},${source.longitude}`,
                destination: `${destination.latitude},${destination.longitude}`,
                mode: TravelMode.driving,
                units: UnitSystem.imperial,
                key: process.env.GOOGLE_MAPS_API_KEY || ""
            }
        });

        if (response.data.routes.length === 0) {
            return res.status(500).json({ message: "No routes found.", success: false });
        }

        const totalDistanceInMeters = response.data.routes[0].legs[0].distance.value;

        /*
        const totalDistanceInFeet = totalDistanceInMeters * 3.281; // Convert meters to feet
        const standardCost = (totalDistanceInFeet * 2) / 100;
        */
        const totalDistanceInMiles = totalDistanceInMeters / 1609.34; // Convert meters to miles

        //TODO: make the "1" below a variable that is configurable from the admin back end
        const standardCost = totalDistanceInMiles * 1; // charge $1 per mile

        const costList = [
            standardCost,
            standardCost * 0.85,
            standardCost * 1.20
        ];

        return res.json({ costList });
    } catch (err) {
        return res.status(500).json({ message: "Error fetching directions.", success: false, error: err });
    }
};

export default tripCostList;