import dotenv from 'dotenv';
dotenv.config();
console.log(process.env);

import express from 'express';
import { createConnection } from 'typeorm';

import { validatePhoneNumber } from './routes/validatePhoneNumber.ts';
import { validateOTP } from './routes/validateOTP.ts';
import { signUp } from "./routes/signUp.ts";
import { getPreferredDrivers } from "./routes/getPreferredDrivers.ts";
import { driverSignup } from "./routes/driverSignup.ts";
import { tripCostList } from "./routes/getTripCostList.ts"
import { ThreeSecondLimiter, TenSecondLimiter } from "./middleware/rateLimiter.ts";

const app = express();
app.use(express.json());

createConnection().then(async connection => {

  app.post('/api/validate-phone', ThreeSecondLimiter, async (req, res) => validatePhoneNumber(req, res, connection));
  app.post('/api/validate-otp', async (req, res) => validateOTP(req, res, connection));

  app.post("/api/sign-up", TenSecondLimiter, async (req, res) => signUp(req, res, connection));
  app.post('/api/driver-signup', async (req, res) => driverSignup(req, res, connection));

  app.post('/api/get-preferred-drivers', async (req, res) => getPreferredDrivers(req, res, connection));
  app.post('/api/trip-cost-list', async (req, res) => tripCostList(req, res, connection));

  app.listen(3000, () => console.log('Server running on port 3000'));

}).catch(error => console.log(error));
