var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PreferredDriver } from '../entities/PreferredDriver.js';
import logger from "../middleware/logger.js";
export const getPreferredDrivers = (req, res, connection) => __awaiter(void 0, void 0, void 0, function* () {
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
        const preferredDrivers = yield preferredDriverRepo
            .createQueryBuilder("preferredDriver")
            .innerJoinAndSelect("preferredDriver.driver", "driver")
            .innerJoinAndSelect("driver.user", "user") // assuming driver has a reference to user
            .where("preferredDriver.user_InternalId = :userInternalId", { userInternalId })
            .getMany();
        // Format the result
        const result = preferredDrivers.map((pd) => ({
            InternalId: pd.driver.InternalId,
            name: `${pd.driver.user.firstName} ${pd.driver.user.lastName}`,
            success: true
        }));
        return res.json(result);
    }
    catch (error) {
        logger.error("Error fetching preferred drivers:", error);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
});
//# sourceMappingURL=getPreferredDrivers.js.map