import { Request, Response } from 'express';
import { DataSource } from 'typeorm';

import { Driver } from '../entities/Driver.js';
import logger from "../middleware/logger.js";
import { ExtendedRequest } from '../interfaces/ExtendedRequest.js';

export const driverSignup = async (req: ExtendedRequest, res: Response, connection: DataSource) => {
    try {
        // Extract userInternalId from request body
        const userInternalId = req.body.userInternalId;

        if (!userInternalId) {
            return res.status(400).json({
                success: false,
                errorCode: '001',
                message: 'Driver ID is missing.'
            });
        }

        logger.info("New driver signed up:", userInternalId); // Logging the action

        // Check if a driver with the same userInternalId already exists
        const driverRepo = connection.getRepository(Driver);
        const existingDriver = await driverRepo.findOne({ where: { id: userInternalId } });

        if (existingDriver) {
            return res.status(400).json({
                success: false,
                errorCode: '002',
                message: 'Driver with this ID already exists.'
            });
        }

        // Create a new Driver entity
        const newDriver = new Driver();
        newDriver.userInternalId = userInternalId;
        newDriver.approved = false;
        newDriver.online = false;

        // Save the new Driver entity to the database
        await driverRepo.save(newDriver);

        logger.info("New driver signed up:", userInternalId); // Logging the action

        return res.status(201).json({
            success: true,
            online: newDriver.online,
            approved: newDriver.approved
        });

    } catch (error) {
        logger.error('Driver signup error:', error); // Logging the error

        return res.status(500).json({
            success: false,
            errorCode: '003',
            message: 'An unexpected error occurred.'
        });
    }
}
