import { Request, Response } from 'express';
import { DataSource } from 'typeorm';

import logger from "../../middleware/logger.js";

export const authenticateToken = async (res: Response) => {
    try {
        // if we get here, the token was good, just return a 200
        return res.status(200);
    } catch (error) {
        logger.error("Error authenticating token:", error);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
}
