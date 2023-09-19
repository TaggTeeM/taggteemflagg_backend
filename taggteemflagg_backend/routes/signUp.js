var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "../entities/User.js";
import logger from "../middleware/logger.js";
import { formatPhoneNumber } from "../middleware/formatters.js";
import { checkLoginType } from '../middleware/validators.js';
import { storeAndSendOtp } from '../middleware/oneTimePasswords.js';
import { OTPType } from "../entities/OTPValidation.js";
export const signUp = (req, res, connection) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("New sign up");
    if (!req.body.phone) {
        logger.error("Phone number is required");
        return res.status(400).json({ message: "Phone number is required.", success: false });
    }
    const [countryCode, phoneNumber] = formatPhoneNumber(req.body.phone);
    logger.info(`phoneNumber: ${phoneNumber}`);
    if (!phoneNumber) {
        logger.error("Invalid phone number");
        return res.status(400).json({ message: "Invalid phone number.", success: false });
    }
    const email = req.body.email;
    logger.info(`email: ${email}`);
    if (!email) {
        logger.error("Email is required");
        return res.status(400).json({ message: "Email is required.", success: false });
    }
    const firstName = req.body.firstName;
    logger.info(`firstName: ${firstName}`);
    if (!firstName) {
        logger.error("First name is required");
        return res.status(400).json({ message: "First name is required.", success: false });
    }
    const lastName = req.body.lastName;
    logger.info(`lastName: ${lastName}`);
    if (!lastName) {
        logger.error("Last name is required");
        return res.status(400).json({ message: "Last name is required.", success: false });
    }
    // get the user based on phone number OR email
    const userRepository = connection.getRepository(User);
    const existingUser = yield userRepository.findOne({ where: [{ phoneNumber: phoneNumber }, { email: email }] });
    if (existingUser) {
        logger.error("A user with this phone number or email already exists");
        return res.status(400).json({ message: "User already exists.", success: false });
    }
    logger.info("Saving user");
    const newUser = new User();
    newUser.phoneNumber = phoneNumber;
    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.locked = true;
    try {
        const savedUser = yield userRepository.save(newUser);
        logger.info("savedUser:", savedUser);
        let user = yield checkLoginType(connection, newUser.phoneNumber, OTPType.PHONE, undefined, true);
        if (!user) {
            return res.status(400).json({ message: "Phone number error", success: false });
        }
        user = yield checkLoginType(connection, newUser.email, OTPType.EMAIL, undefined, true);
        if (!user) {
            return res.status(400).json({ message: "Email address error", success: false });
        }
        // send both phone and email OTPs
        storeAndSendOtp(connection, user, OTPType.PHONE)
            .then((code) => {
            logger.info("Successfully sent phone OTP");
            storeAndSendOtp(connection, user, OTPType.EMAIL)
                .then((code) => {
                logger.info("Successfully sent email OTP");
                return res.status(201).json({ message: "Rider successfully signed up, OTPs sent.", success: true, phone: user === null || user === void 0 ? void 0 : user.phoneNumber, email: user === null || user === void 0 ? void 0 : user.email });
            })
                .catch((error) => {
                if (error instanceof Error)
                    logger.error(`Error sending email OTP`, {
                        error: error.message || error,
                        stack: error.stack,
                        email: user.email,
                    });
                else
                    logger.error(`Failed to send email OTP with an unknown error.`, error);
                return res.status(500).json({ message: "Internal server error.", success: false });
            });
        })
            .catch((error) => {
            if (error instanceof Error)
                logger.error(`Error sending phone OTP`, {
                    error: error.message || error,
                    stack: error.stack,
                    phoneNumber: user.phoneNumber,
                });
            else
                logger.error(`Failed to send phone OTP with an unknown error.`, error);
            return res.status(500).json({ message: "Internal server error.", success: false });
        });
    }
    catch (error) {
        if (error instanceof Error)
            logger.error(`Error saving user`, {
                error: error.message || error,
                stack: error.stack,
                newUser: newUser,
            });
        else
            logger.error(`Failed to save user with an unknown error.`, error);
        return res.status(500).json({ message: "Internal server error.", success: false });
    }
});
//# sourceMappingURL=signUp.js.map