var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client, TravelMode, UnitSystem } from "@googlemaps/google-maps-services-js";
const client = new Client({});
export const tripCostList = (req, res, connection) => __awaiter(void 0, void 0, void 0, function* () {
    const { source, destination } = req.body;
    console.log("Calling getTripCostLists.tripCostList");
    try {
        const response = yield client.directions({
            params: {
                origin: `${source.latitude},${source.longitude}`,
                destination: `${destination.latitude},${destination.longitude}`,
                mode: TravelMode.driving,
                units: UnitSystem.imperial,
                key: process.env.GOOGLE_MAPS_API_KEY || ""
            }
        });
        const totalDistanceInMeters = response.data.routes[0].legs[0].distance.value;
        /*
        const totalDistanceInFeet = totalDistanceInMeters * 3.281; // Convert meters to feet
        const standardCost = (totalDistanceInFeet * 2) / 100;
        */
        const totalDistanceInMiles = totalDistanceInMeters / 1609.34; // Convert meters to miles
        //TODO: make the "1" below a variable that is configurable from the admin back end
        const standardCost = totalDistanceInMiles * 1; // charge $1 per mile
        const costList = [
            standardCost,
            standardCost * 0.85,
            standardCost * 1.20
        ];
        return res.json({ costList });
    }
    catch (err) {
        return res.status(500).json({ message: "Error fetching directions.", success: false, error: err });
    }
});
export default tripCostList;
//# sourceMappingURL=getTripCostList.js.map