import { Request, Response } from 'express';

import { PreferredDriver } from '../entities/PreferredDriver.ts';
import logger from "../middleware/logger.ts"; // Adjust the path accordingly
import { DataSource } from 'typeorm';

export const getPreferredDrivers = async (req: Request, res: Response, connection: DataSource) => {
    try {
        const { userInternalId } = req.body;

        if (!userInternalId) {
            return res.status(400).json({
                success: false,
                errorCode: '001',
                message: 'Driver ID is missing.'
            });
        }

        logger.info("Getting preferred drivers for:", userInternalId); // Logging the action

        // Get the PreferredDriver repository
        const preferredDriverRepo = connection.getRepository(PreferredDriver);

        // Fetch the preferred drivers for the given userInternalId
        const preferredDrivers = await preferredDriverRepo
            .createQueryBuilder("preferredDriver")
            .innerJoinAndSelect("preferredDriver.driver", "driver")
            .innerJoinAndSelect("driver.user", "user")  // assuming driver has a reference to user
            .where("preferredDriver.user_InternalId = :userInternalId", { userInternalId })
            .getMany();

        // Format the result
        const result = preferredDrivers.map((pd: PreferredDriver) => ({
            InternalId: pd.driver.InternalId, 
            name: `${pd.driver.user.firstName} ${pd.driver.user.lastName}`,
            success: true
        }));

        return res.json(result);

    } catch (error) {
        logger.error("Error fetching preferred drivers:", error);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
}
