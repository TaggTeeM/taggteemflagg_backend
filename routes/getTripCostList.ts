import { Client, TravelMode, UnitSystem } from "@googlemaps/google-maps-services-js";
import { Request, Response } from 'express';

import { MapCoordinate } from "../entities/MapCoordinate.ts";

const client = new Client({});

export const tripCostList = async (req: Request, res: Response, connection: any) => {
    const { source, destination}: { source: MapCoordinate, destination: MapCoordinate } = req.body;

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

        const totalDistanceInMeters = response.data.routes[0].legs[0].distance.value;
        const totalDistanceInFeet = totalDistanceInMeters * 3.281; // Convert meters to feet

        const standardCost = (totalDistanceInFeet * 2) / 100;
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