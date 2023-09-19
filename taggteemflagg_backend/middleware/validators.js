var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from '../entities/User.js';
import { OTPType } from '../entities/OTPValidation.js';
import logger from "../middleware/logger.js";
import { formatPhoneNumber } from '../middleware/formatters.js';
/**
 * Simple function to validate email
 * @param email The email to validate
 */
export const isEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
};
export const checkLoginType = (connection, login, loginType, driverRelation, isLocked) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info(`Validating login: ${loginType}`);
        if (!login) {
            logger.error(`No login provided ${login}`);
            return null;
        }
        logger.info(`Login: ${login}`);
        if (loginType == OTPType.PHONE) {
            let countryCode;
            // manipulate the req.body.number to be formatted as a standard Flagg phone number string, then look it up in the users table (not the phone number table as is below)
            [countryCode, login] = formatPhoneNumber(login);
            logger.info(`Formatted phone number: ${login}`);
            if (!login) {
                logger.error(`Failed to format phone number`);
                return null;
            }
        }
        const userRepository = connection.getRepository(User);
        const userOptions = loginType == OTPType.EMAIL ? { email: login } : { phoneNumber: login };
        const user = yield userRepository.findOne({
            where: Object.assign(Object.assign({}, userOptions), { active: true, locked: typeof isLocked !== 'undefined' ? isLocked : false }),
            relations: {
                driver: typeof driverRelation !== 'undefined' ? driverRelation : false
            }
        });
        if (!user) {
            logger.error("No user found with this login");
            return null;
        }
        logger.info("User found");
        return user;
    }
    catch (error) {
        if (error instanceof Error)
            logger.error("Error validating login", {
                error: error.message || error,
                login: login,
                stack: error.stack,
            });
        else
            logger.error("Failed to validate login.");
        return null;
    }
});
/*
export const checkEmail = async (connection: any, Email: string): Promise<User | null> => {
    try {
        logger.info("Validating email");

        const userRepository = connection.getRepository(User);
        
        if (!Email) {
            logger.error("Failed to format phone number", Email);
            return null;
        }
        
        logger.info("Email address:", Email)

        const user = await userRepository.findOne({ where: { email: Email } });

        logger.info("User exists?", Boolean(user));

        if (!user) {
            logger.error("No user found with this email");
            return null;
        }

        return user;
    } catch (error) {
        if (error instanceof Error)
            logger.error("Error in checkPhoneNumber", {
                error: error.message || error,
                Email
            });
        else
            logger.error("Failed to validate phone number.");

        return null;
    }
};

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
*/ 
//# sourceMappingURL=validators.js.map