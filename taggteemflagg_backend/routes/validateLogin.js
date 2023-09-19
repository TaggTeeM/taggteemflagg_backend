var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import logger from "../middleware/logger.js";
import { checkLoginType, isEmail } from '../middleware/validators.js';
import { storeAndSendOtp } from '../middleware/oneTimePasswords.js';
import { OTPType } from '../entities/OTPValidation.js';
export const validateLogin = (req, res, connection) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info("Validating login");
    logger.info("Checking if email or phone");
    const validationType = isEmail(req.body.phone) ? OTPType.EMAIL : OTPType.PHONE;
    // get login from "req.body.phone" and see if it's a phone number or email, and get the user if they exist
    const user = yield checkLoginType(connection, req.body.phone, validationType);
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
});
//# sourceMappingURL=validateLogin.js.map