import dotenv from 'dotenv';
dotenv.config();
console.log(process.env);

import twilio from 'twilio';
import { DataSource } from 'typeorm';

import { User } from '../entities/User.ts';
import { OTPType, OTPValidation } from '../entities/OTPValidation.ts';
import logger from "../middleware/logger.ts"

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN
  );
  
export const storeAndSendOtp = async (connection: DataSource, user: User, validationType: OTPType): Promise<number | null> => {
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
        newOTPValidation.otpType = validationType;
        await otpValidationRepository.save(newOTPValidation);

        logger.info(`${validationType} OTP generated and stored`, { code, userInternalId: user.InternalId });

        // Send the code via SMS using Twilio
        try {
            const sendOverAir = (/true/i).test(process.env.SEND_OVER_AIR_OTPS as string);

            if (validationType == OTPType.PHONE) {
                if (sendOverAir)
                    // send the OTP to the client via SMS
                    await twilioClient.messages.create({
                        body: `Your OTP is: ${code}`,
                        from: process.env.TWILIO_PHONE_NUMBER, 
                        to: user.phoneNumber
                    });
            } else {
                if (sendOverAir)
                    //TODO: finish setting up Twilio SendMatrix to be able to email
                    // send the OTP to the client via email
                    twilioClient.verify.v2.services('')
            }

            logger.info(`${validationType} OTP sent via Twilio`)

            return code;
        } catch (error) {
            if (error instanceof Error)
                logger.error(`Error sending ${validationType} OTP via Twilio`, {
                    error: error.message || error,
                    trace: (error as Error).stack,
                    PhoneNumber: user?.phoneNumber,
                    Email: user?.email,
                });
            else
                logger.error(`Failed to send ${validationType} OTP via Twilio with an unknown error.`, error);

                return null;
        }
    } catch (error) {
        if (error instanceof Error)
            logger.error("Error in storeAndSendOtp", {
                error: error.message || error,
                trace: (error as Error).stack,
                PhoneNumber: user?.phoneNumber,
                Email: user?.email,
            });
        else
            logger.error(`Failed to store ${validationType} OTP with an unknown error.`, error);

        return null;
    }
}