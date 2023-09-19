var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Driver } from '../entities/Driver.js';
import logger from "../middleware/logger.js";
export const driverSignup = (req, res, connection) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingDriver = yield driverRepo.findOne({ where: { id: userInternalId } });
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
        yield driverRepo.save(newDriver);
        logger.info("New driver signed up:", userInternalId); // Logging the action
        return res.status(201).json({
            success: true,
            online: newDriver.online,
            approved: newDriver.approved
        });
    }
    catch (error) {
        logger.error('Driver signup error:', error); // Logging the error
        return res.status(500).json({
            success: false,
            errorCode: '003',
            message: 'An unexpected error occurred.'
        });
    }
});
//# sourceMappingURL=driverSignup.js.map