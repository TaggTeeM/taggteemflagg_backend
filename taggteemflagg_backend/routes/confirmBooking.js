var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client } from "@googlemaps/google-maps-services-js";
import { ConfirmedBooking } from "../entities/ConfirmedBooking.js";
const client = new Client({});
export const confirmBooking = (req, res, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const { confirmedBooking } = req.body;
    console.log("Calling confirmBooking.confirmBooking");
    try {
        const confirmedBookingRepository = connection.getRepository(ConfirmedBooking);
        yield confirmedBookingRepository.save(confirmedBooking);
        return res.json({});
    }
    catch (err) {
        return res.status(500).json({ message: "Error fetching directions.", success: false, error: err });
    }
});
export default confirmBooking;
//# sourceMappingURL=confirmBooking.js.map