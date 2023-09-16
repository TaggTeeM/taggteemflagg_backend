import { Request, Response } from 'express';
import { DataSource, MoreThan } from 'typeorm';

import { User } from '../entities/User.ts';  // Import the User entity
import logger from "../middleware/logger.ts"
import { OTPType, OTPValidation } from '../entities/OTPValidation.ts';
import { checkLoginType, isEmail } from '../middleware/validators.ts';

export const validateOTP = async (req: Request, res: Response, connection: DataSource) => {
    logger.info("Validating OTP");

    const OTP_TIMEOUT_MINUTES = 15;

    const isEmailInput = isEmail(req.body.phone);

    // First, find the user with the provided phone number
    const validationType: OTPType = isEmailInput ? OTPType.EMAIL : OTPType.PHONE;

    // get login from "req.body.phone" and see if it's a phone number or email, and get the user if they exist
    const user : User | null = await checkLoginType(connection, req.body.phone, validationType, undefined, false);

    if (!user) {
        return res.status(400).json({ message: "Rider not found.", success: false });
    }

    logger.info(`Validating OTP for user: ${JSON.stringify(user)}`);

    if (isEmailInput) {
        logger.info(`Email OTP validated`);

        user.emailValidated = true;

        if (user.phoneValidated && user.locked) {
            user.locked = false;
            
            logger.info(`Unlocking user`);
        }
    } else {
        logger.info(`Phone OTP validated`);

        user.phoneValidated = true;

        if (user.emailValidated && user.locked) {
            user.locked = false;
            
            logger.info(`Unlocking user`);
        }
    }

    logger.info(`Saving user`);

    await connection.getRepository(User).save(user);

    // Calculate the timestamp 15 minutes in the past
    const dateThreshold = new Date();
    dateThreshold.setMinutes(dateThreshold.getMinutes() - OTP_TIMEOUT_MINUTES);

    // Next, find the OTPValidation using the InternalId of the user and the provided OTP
    const otpValidationRepository = connection.getRepository(OTPValidation);
    const otpValidation = await otpValidationRepository.findOne({
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
    await otpValidationRepository.save(otpValidation);
    
    // If you reached here, the OTP is valid
    res.json({ message: "OTP validated successfully.", success: true, user: { 
        id: user.InternalId, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        phone: user.phoneNumber, 
        driver: user.driver 
            ? { approved: user.driver.approved, online: user.driver.online } 
            : null
    } });
}
