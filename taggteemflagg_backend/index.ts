import dotenv from 'dotenv';

dotenv.config();
console.log(process.env);

import express from 'express';

import { validateLogin } from './routes/validateLogin.js';
import { validateOTP } from './routes/validateOTP.js';
import { signUp } from "./routes/signUp.js";
import { getPreferredDrivers } from "./routes/getPreferredDrivers.js";
import { driverSignup } from "./routes/driverSignup.js";
import { tripCostList } from "./routes/getTripCostList.js"
import { ThreeSecondLimiter, TenSecondLimiter } from "./middleware/rateLimiter.js";
import logger from './middleware/logger.js';
import { OrmConnectionSource } from './middleware/ormConnectionSource.js';
import confirmBooking from './routes/confirmBooking.js';
import { authenticateJWT } from './middleware/authenticateJWT.js';

const app = express();
app.use(express.json());

OrmConnectionSource
    .initialize()
    .then(() => {
        app.post('/api/validate-login', ThreeSecondLimiter, async (req, res) => validateLogin(req, res, OrmConnectionSource));
        app.post('/api/validate-otp', async (req, res) => validateOTP(req, res, OrmConnectionSource));

        app.post("/api/sign-up", TenSecondLimiter, async (req, res) => signUp(req, res, OrmConnectionSource));
        app.post('/api/driver-signup', authenticateJWT, async (req, res) => driverSignup(req, res, OrmConnectionSource));

        app.post('/api/get-preferred-drivers', authenticateJWT, async (req, res) => getPreferredDrivers(req, res, OrmConnectionSource));
        app.post('/api/trip-cost-list', authenticateJWT, async (req, res) => tripCostList(req, res, OrmConnectionSource));

        app.post('/api/booking/confirm-booking', authenticateJWT, async (req, res) => confirmBooking(req, res, OrmConnectionSource));

        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch((error) => {
        if (error instanceof Error)
            logger.error(`Error initializing data source`, {
                error: error.message || error,
                stack: (error as Error).stack,
            });
        else
            logger.error(`Failed to initialize data source with an unknown error.`, error);

        return null;
    });

