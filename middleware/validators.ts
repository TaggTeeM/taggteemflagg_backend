import { User } from '../entities/User.ts';
import { OTPValidation } from '../entities/OTPValidation.ts';
import logger from "../middleware/logger.ts"
import { formatPhoneNumber } from '../middleware/formatters.ts';

export const checkPhoneNumber = async (connection: any, PhoneNumber: string): Promise<User | null> => {
    try {
        logger.info("Validating phone number");

        const userRepository = connection.getRepository(User);
        
        // manipulate the req.body.number to be formatted as a standard Flagg phone number string, then look it up in the users table (not the phone number table as is below)
        const formattedPhoneNumber = formatPhoneNumber(PhoneNumber);
        
        logger.info("Formatted phone number:", formattedPhoneNumber)

        if (!formattedPhoneNumber) {
            logger.error("Failed to format phone number", { PhoneNumber });
            return null;
        }

        const user = await userRepository.findOne({ where: { phoneNumber: formattedPhoneNumber } });

        logger.info("Phone lookup", { phoneNumber: formattedPhoneNumber, userExists: Boolean(user) });

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        if (error instanceof Error)
            logger.error("Error in checkPhoneNumber", {
                error: error.message || error,
                PhoneNumber
            });
        else
            logger.error("Failed to validate phone number.");

        return null;
    }
}