var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MoreThan } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User.js'; // Import the User entity
import logger from "../middleware/logger.js";
import { OTPType, OTPValidation } from '../entities/OTPValidation.js';
import { checkLoginType, isEmail } from '../middleware/validators.js';
export const validateOTP = (req, res, connection) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Validating OTP");
    const OTP_TIMEOUT_MINUTES = 15;
    const isEmailInput = isEmail(req.body.phone);
    // First, find the user with the provided phone number
    const validationType = isEmailInput ? OTPType.EMAIL : OTPType.PHONE;
    // get login from "req.body.phone" and see if it's a phone number or email, and get the user if they exist
    const user = yield checkLoginType(connection, req.body.phone, validationType, undefined, false);
    if (!user) {
        return res.status(400).json({ message: "Rider not found.", success: false });
    }
    logger.info(`Validating ${(isEmailInput ? "Email" : "Phone")} OTP for user: ${JSON.stringify(user)}`);
    // Calculate the timestamp 15 minutes in the past
    const dateThreshold = new Date();
    dateThreshold.setMinutes(dateThreshold.getMinutes() - OTP_TIMEOUT_MINUTES);
    // Next, find the OTPValidation using the InternalId of the user and the provided OTP
    const otpValidationRepository = connection.getRepository(OTPValidation);
    const otpValidation = yield otpValidationRepository.findOne({
        where: {
            userInternalId: user.InternalId,
            otp: req.body.otp,
            otpType: validationType,
            validated: false,
            active: true,
            createDate: MoreThan(dateThreshold)
        }
    });
    // If no valid OTPValidation entry is found, return an error
    if (!otpValidation) {
        return res.status(400).json({ message: "Invalid OTP.", success: false });
    }
    // Update the otpValidation entry's active and validated fields
    otpValidation.active = false;
    otpValidation.validated = true;
    // Save the updated otpValidation entry
    yield otpValidationRepository.save(otpValidation);
    // set user unlocking if need be
    if (!user.emailValidated || !user.phoneValidated) {
        if (isEmailInput) {
            logger.info(`Setting email validation`);
            user.emailValidated = true;
            if (user.phoneValidated && user.locked) {
                user.locked = false;
                logger.info(`Unlocking user`);
            }
        }
        else {
            logger.info(`Setting phone validation`);
            user.phoneValidated = true;
            if (user.emailValidated && user.locked) {
                user.locked = false;
                logger.info(`Unlocking user`);
            }
        }
        logger.info(`Saving user`);
        yield connection.getRepository(User).save(user);
    }
    const accessToken = jwt.sign({ phoneNumber: user.phoneNumber }, 'yourSecretKey', { expiresIn: '1h' });
    logger.info(`Created access token [${JSON.stringify(accessToken)}]`);
    // If you reached here, the OTP is valid
    res.json({ message: "OTP validated successfully.", accessToken: accessToken, success: true, user: {
            id: user.InternalId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phoneNumber,
            driver: user.driver
                ? { approved: user.driver.approved, online: user.driver.online }
                : null
        } });
});
//# sourceMappingURL=validateOTP.js.map