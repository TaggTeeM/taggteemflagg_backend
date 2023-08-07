import { Request, Response } from "express";

import { User } from "../entities/User.ts";
import logger from "../middleware/logger.ts"
import { formatPhoneNumber } from "../middleware/formatters.ts";
import { checkPhoneNumber } from '../middleware/validators.ts';
import { storeAndSendOtp } from '../middleware/oneTimePasswords.ts';

export const signUp = async (req: Request, res: Response, connection: any) => {
  logger.info("New sign up");

  if (!req.body.phone) {
    return res.status(400).json({ message: "Phone number is required.", success: false });
  }

  const phoneNumber = formatPhoneNumber(req.body.phone);
  logger.info("Phone number:" + phoneNumber);

  if (!phoneNumber) {
    return res.status(400).json({ message: "Invalid phone number.", success: false });
  }

  const firstName = req.body.firstName;
  logger.info(firstName);

  if (!firstName) {
    return res.status(400).json({ message: "First name is required.", success: false });
  }

  const userRepository = connection.getRepository(User);
  const existingUser = await userRepository.findOne({ where: { phoneNumber: phoneNumber } });

  if (existingUser) {
    return res.status(400).json({ message: "Phone number already exists.", success: false });
  }

  const newUser = new User();
  newUser.phoneNumber = phoneNumber;
  newUser.firstName = firstName;

  try {
    const ddd = await userRepository.save(newUser);

    logger.info("ddd:", ddd);

    const user = await checkPhoneNumber(connection, req.body.phone);

    if (!user) {
        return res.status(400).json({ message: "Invalid phone number.", success: false });
    }
    
    storeAndSendOtp(connection, user)
        .then((code) => {
            logger.info("Successfully sent OTP")

            return res.status(201).json({ message: "Rider successfully signed up, OTP sent.", success: true });
        })
        .catch((reason) => {
            logger.info("Did not successfully send OTP")
            
            return res.status(500).json({ message: "Internal server error.", success: false });
        });
  } catch (err) {
    logger.error("Error while saving user:", err);
    return res.status(500).json({ message: "Internal server error.", success: false });
  }
};
