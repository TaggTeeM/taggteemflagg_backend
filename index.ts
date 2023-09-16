import dotenv from 'dotenv';

dotenv.config();
console.log(process.env);

import express from 'express';

import { validateLogin } from './routes/validateLogin.ts';
import { validateOTP } from './routes/validateOTP.ts';
import { signUp } from "./routes/signUp.ts";
import { getPreferredDrivers } from "./routes/getPreferredDrivers.ts";
import { driverSignup } from "./routes/driverSignup.ts";
import { tripCostList } from "./routes/getTripCostList.ts"
import { ThreeSecondLimiter, TenSecondLimiter } from "./middleware/rateLimiter.ts";
import logger from './middleware/logger.ts';
import { OrmConnectionSource } from './middleware/ormConnectionSource.ts';
import confirmBooking from './routes/confirmBooking.ts';
import { authenticateJWT } from './middleware/authenticateJWT.ts';

const app = express();
app.use(express.json());

OrmConnectionSource
  .initialize()
  .then(() =>
  {
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

