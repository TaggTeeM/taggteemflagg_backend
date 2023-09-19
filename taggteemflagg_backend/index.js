var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env);
import express from 'express';
import { validateLogin } from './routes/validateLogin.js';
import { validateOTP } from './routes/validateOTP.js';
import { signUp } from "./routes/signUp.js";
import { getPreferredDrivers } from "./routes/getPreferredDrivers.js";
import { driverSignup } from "./routes/driverSignup.js";
import { tripCostList } from "./routes/getTripCostList.js";
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
    app.post('/api/validate-login', ThreeSecondLimiter, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return validateLogin(req, res, OrmConnectionSource); }));
    app.post('/api/validate-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return validateOTP(req, res, OrmConnectionSource); }));
    app.post("/api/sign-up", TenSecondLimiter, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return signUp(req, res, OrmConnectionSource); }));
    app.post('/api/driver-signup', authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return driverSignup(req, res, OrmConnectionSource); }));
    app.post('/api/get-preferred-drivers', authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return getPreferredDrivers(req, res, OrmConnectionSource); }));
    app.post('/api/trip-cost-list', authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return tripCostList(req, res, OrmConnectionSource); }));
    app.post('/api/booking/confirm-booking', authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return confirmBooking(req, res, OrmConnectionSource); }));
    app.listen(3000, () => console.log('Server running on port 3000'));
})
    .catch((error) => {
    if (error instanceof Error)
        logger.error(`Error initializing data source`, {
            error: error.message || error,
            stack: error.stack,
        });
    else
        logger.error(`Failed to initialize data source with an unknown error.`, error);
    return null;
});
//# sourceMappingURL=index.js.map