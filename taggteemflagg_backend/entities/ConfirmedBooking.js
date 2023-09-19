var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { MapCoordinate } from "./MapCoordinate.js";
import { Booking } from "./Booking.js";
import { Driver } from "./Driver.js";
let ConfirmedBooking = class ConfirmedBooking extends Booking {
};
__decorate([
    Column({ type: "timestamp", name: "driver_confirmation_timestamp", nullable: true }),
    __metadata("design:type", Object)
], ConfirmedBooking.prototype, "driverConfirmationTimestamp", void 0);
__decorate([
    Column({ type: "varchar", length: 255, name: "driver_name", nullable: true }),
    __metadata("design:type", Object)
], ConfirmedBooking.prototype, "driverName", void 0);
__decorate([
    Column({ type: "int", name: "trip_rating", nullable: true }),
    __metadata("design:type", Object)
], ConfirmedBooking.prototype, "tripRating", void 0);
__decorate([
    Column({ type: "timestamp", name: "pickup_timestamp", nullable: true }),
    __metadata("design:type", Object)
], ConfirmedBooking.prototype, "pickupTimestamp", void 0);
__decorate([
    Column({ type: "timestamp", name: "dropoff_timestamp", nullable: true }),
    __metadata("design:type", Object)
], ConfirmedBooking.prototype, "dropoffTimestamp", void 0);
__decorate([
    Column({ name: "pickup_coordinates_InternalId", type: "varchar", length: 45, unique: false, nullable: true }),
    __metadata("design:type", Object)
], ConfirmedBooking.prototype, "pickupCoordinatesInternalId", void 0);
__decorate([
    Column({ name: "dropoff_coordinates_InternalId", type: "varchar", length: 45, unique: false, nullable: true }),
    __metadata("design:type", Object)
], ConfirmedBooking.prototype, "dropoffCoordinatesInternalId", void 0);
__decorate([
    ManyToOne("Driver", (driver) => driver.InternalId),
    JoinColumn({ name: "driver_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", Driver)
], ConfirmedBooking.prototype, "driver", void 0);
__decorate([
    ManyToOne("MapCoordinate", (mapCoordinate) => mapCoordinate.InternalId),
    JoinColumn({ name: "pickup_coordinates_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", MapCoordinate)
], ConfirmedBooking.prototype, "pickupCoordinates", void 0);
__decorate([
    ManyToOne("MapCoordinate", (mapCoordinate) => mapCoordinate.InternalId),
    JoinColumn({ name: "dropoff_coordinates_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", MapCoordinate)
], ConfirmedBooking.prototype, "dropoffCoordinates", void 0);
ConfirmedBooking = __decorate([
    Entity({ name: "confirmed_bookings" })
], ConfirmedBooking);
export { ConfirmedBooking };
//# sourceMappingURL=ConfirmedBooking.js.map