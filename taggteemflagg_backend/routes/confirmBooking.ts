import { Client, TravelMode, UnitSystem } from "@googlemaps/google-maps-services-js";
import { Request, Response } from 'express';
import { DataSource } from "typeorm";

import { MapCoordinate } from "../entities/MapCoordinate.js";
import { ConfirmedBooking } from "../entities/ConfirmedBooking.js";
import { User } from "../entities/User.js";
import { ExtendedRequest } from "../interfaces/ExtendedRequest.js";

const client = new Client({});

export const confirmBooking = async (req: ExtendedRequest, res: Response, connection: DataSource) => {
    const { confirmedBooking }: { confirmedBooking: ConfirmedBooking } = req.body;

    console.log("Calling confirmBooking.confirmBooking");

    try {
        const foundUser = await connection.getRepository(User).findOne({ where: { phoneNumber: req.phoneNumber } });

        if (!foundUser) {
            return res.status(400).json({
                success: false,
                errorCode: '001',
                message: 'User not found.'
            });
        }

        // if either source coordinate or destination coordinate are null, return error
        if (!confirmedBooking.sourceCoordinate || !confirmedBooking.destinationCoordinate) {
            return res.status(400).json({
                success: false,
                errorCode: '002',
                message: 'Source or destination coordinate is null.'
            });
        }

        // get InternalIds, etc.

        // truncate the length of source coordinate latitude and longitude to 9 decimal places
        confirmedBooking.sourceCoordinate.latitude = Number(confirmedBooking.sourceCoordinate.latitude.toFixed(9));
        confirmedBooking.sourceCoordinate.longitude = Number(confirmedBooking.sourceCoordinate.longitude.toFixed(9));

        // truncate the length of destination coordinate latitude and longitude to 9 decimal places
        confirmedBooking.destinationCoordinate.latitude = Number(confirmedBooking.destinationCoordinate.latitude.toFixed(9));
        confirmedBooking.destinationCoordinate.longitude = Number(confirmedBooking.destinationCoordinate.longitude.toFixed(9));

        let sourceCoordinate = await connection.getRepository(MapCoordinate).findOne({ where: { latitude: confirmedBooking.sourceCoordinate.latitude, longitude: confirmedBooking.sourceCoordinate.longitude } });
        if (!sourceCoordinate) {
            // create a new MapCoordinate based on the confirmedBooking.sourceCoordinate
            sourceCoordinate = new MapCoordinate();
            sourceCoordinate.latitude = confirmedBooking.sourceCoordinate.latitude;
            sourceCoordinate.longitude = confirmedBooking.sourceCoordinate.longitude;
            sourceCoordinate.address = confirmedBooking.sourceCoordinate.address;

            // save the new MapCoordinate
            await connection.getRepository(MapCoordinate).save(sourceCoordinate);
        }

        let destinationCoordinate = await connection.getRepository(MapCoordinate).findOne({ where: { latitude: confirmedBooking.destinationCoordinate.latitude, longitude: confirmedBooking.destinationCoordinate.longitude } });
        if (!destinationCoordinate) {
            // create a new MapCoordinate based on the confirmedBooking.destinationCoordinate
            destinationCoordinate = new MapCoordinate();
            destinationCoordinate.latitude = confirmedBooking.destinationCoordinate.latitude;
            destinationCoordinate.longitude = confirmedBooking.destinationCoordinate.longitude;
            destinationCoordinate.address = confirmedBooking.destinationCoordinate.address;

            // save the new MapCoordinate
            await connection.getRepository(MapCoordinate).save(destinationCoordinate);
        }

        // get distance, duration, etc.

        const response = await client.distancematrix({
            params: {
                origins: [`${sourceCoordinate.latitude},${sourceCoordinate.longitude}`],
                destinations: [`${destinationCoordinate.latitude},${destinationCoordinate.longitude}`],
                key: process.env.GOOGLE_MAPS_API_KEY!,
                mode: TravelMode.driving,
                units: UnitSystem.metric
            },
            timeout: 1000 // milliseconds
        });

        if (response.data.status !== "OK") {
            return res.status(500).json({ message: "Error fetching directions.", success: false, error: response.data.status });
        }

        const distance = response.data.rows[0].elements[0].distance.value;
        const duration = response.data.rows[0].elements[0].duration.value;

        // save the confirmed booking
        debugger;

        confirmedBooking.sourceCoordinate = sourceCoordinate;
        confirmedBooking.destinationCoordinate = destinationCoordinate;

        confirmedBooking.distanceInMeters = distance;
        confirmedBooking.distanceInFeet = confirmedBooking.distanceInMeters * 3.2808399;
        confirmedBooking.durationInSeconds = duration;

        confirmedBooking.userInternalId = foundUser.InternalId;

        const confirmedBookingRepository = connection.getRepository(ConfirmedBooking);
        const confirmedBookingWritten = await confirmedBookingRepository.save(confirmedBooking);

        return res.json({ });
    } catch (err) {
        debugger;
        return res.status(500).json({ message: "Error fetching directions.", success: false, error: err });
    }
};

export default confirmBooking;