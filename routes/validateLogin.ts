import { Request, Response } from 'express';
import { DataSource } from 'typeorm';

import logger from "../middleware/logger.ts"

import { checkLoginType, isEmail } from '../middleware/validators.ts';
import { storeAndSendOtp } from '../middleware/oneTimePasswords.ts';
import { OTPType } from '../entities/OTPValidation.ts';

export const validateLogin = async (req: Request, res: Response, connection: DataSource) => {
    logger.info("Validating login");

    logger.info("Checking if email or phone");

    const validationType: OTPType = isEmail(req.body.phone) ? OTPType.EMAIL : OTPType.PHONE;

    // get login from "req.body.phone" and see if it's a phone number or email, and get the user if they exist
    const user = await checkLoginType(connection, req.body.phone, validationType);

    if (!user) {
        return res.status(400).json({ message: "Rider not found.", success: false });
    }

    storeAndSendOtp(connection, user, validationType)
        .then((code) => {
            return res.status(201).json({ message: "Rider found, OTP sent.", success: true });
        })
        .catch((reason) => {
            return res.status(500).json({ message: "There was an error generating the OTP. Please try again later.", success: false });
        });
}