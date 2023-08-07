import { Request, Response } from 'express';

import logger from "../middleware/logger.ts"

import { checkPhoneNumber } from '../middleware/validators.ts';
import { storeAndSendOtp } from '../middleware/oneTimePasswords.ts';

export const validatePhoneNumber = async (req: Request, res: Response, connection: any) => {
    logger.info("Validating phone number");

    const user = await checkPhoneNumber(connection, req.body.phone);

    if (!user) {
        return res.status(400).json({ message: "Invalid phone number.", success: false });
    }

    storeAndSendOtp(connection, user)
        .then((code) => {
            return res.status(201).json({ message: "Rider found, OTP sent.", success: true });
        })
        .catch((reason) => {
            return res.status(500).json({ message: "There was an error generating the OTP. Please try again later.", success: false });
        });
}