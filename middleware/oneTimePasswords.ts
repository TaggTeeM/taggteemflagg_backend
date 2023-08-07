import dotenv from 'dotenv';
dotenv.config();
console.log(process.env);

import twilio from 'twilio';

import { User } from '../entities/User.ts';
import { OTPValidation } from '../entities/OTPValidation.ts';
import logger from "../middleware/logger.ts"
import { formatPhoneNumber } from '../middleware/formatters.ts';

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN
  );
  
export const storeAndSendOtp = async (connection: any, user: User): Promise<number | null> => {
    const PhoneNumber = user.phoneNumber;

    try {
        // Generate a 6 digit code
        const code = Math.floor(100000 + Math.random() * 900000);

        // Get the repository for the OTPValidation entity
        const otpValidationRepository = connection.getRepository(OTPValidation);

        // Update the active field for all rows with the user InternalId as user_InternalId to 0
        await otpValidationRepository
            .createQueryBuilder()
            .update(OTPValidation)
            .set({ active: false })
            .where("user_InternalId = :number", { number: user.InternalId })
            .execute();

        // Add a new row with the formatted phone number and 6 digit code
        const newOTPValidation = new OTPValidation();
        newOTPValidation.userInternalId = user.InternalId;
        newOTPValidation.otp = code;
        newOTPValidation.active = true;
        await otpValidationRepository.save(newOTPValidation);

        logger.info("OTP generated and stored", { code, userInternalId: user.InternalId });

        // Send the code via SMS using Twilio
        try {
            //TODO: Remove this "if (false)" statement! FOR DEBUGGING ONLY!
            if (false)
            await twilioClient.messages.create({
                body: `Your OTP is: ${code}`,
                from: process.env.TWILIO_PHONE_NUMBER, 
                to: user.phoneNumber
            });

            logger.info("OTP sent via Twilio")

            return code;
        } catch (error) {
            logger.error("Error sending OTP via Twilio: ", error);

            return null;
        }
    } catch (error) {
        if (error instanceof Error)
            logger.error("Error in storeAndSendOtp", {
                error: error.message || error,
                PhoneNumber
            });
        else
            logger.error("Failed to store OTP with an unknown error.");

        return null;
    }
}