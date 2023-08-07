import { Request, Response } from 'express';

import { User } from '../entities/User.ts';  // Import the User entity
import logger from "../middleware/logger.ts"
import { OTPValidation } from '../entities/OTPValidation.ts';
import { formatPhoneNumber } from '../middleware/formatters.ts';

export const validateOTP = async (req: Request, res: Response, connection: any) => {
    logger.info("Validating OTP");

    // First, find the user with the provided phone number
    const userRepository = connection.getRepository(User);

    //logger.info("Formatting phone number");

    const formattedPhoneNumber = formatPhoneNumber(req.body.phone);
        
    logger.info("Formatted phone number:" + formattedPhoneNumber)


    const user = await userRepository.findOne({ where: { phoneNumber: formattedPhoneNumber, active: true } });

    // If no user is found, return an error
    if (!user) {
        return res.status(404).json({ message: "User not found.", success: false });
    }

    // Next, find the OTPValidation using the InternalId of the user and the provided OTP
    const otpValidationRepository = connection.getRepository(OTPValidation);
    const otpValidation = await otpValidationRepository.findOne({
        where: {
            userInternalId: user.InternalId,
            otp: req.body.otp,
            validated: false,
            active: true  // Assuming the OTPValidation has an active field, similar to the user
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
    res.json({ message: "OTP validated successfully.", success: true, user: { id: user.InternalId, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phoneNumber } });
}
