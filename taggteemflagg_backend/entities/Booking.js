var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, JoinColumn, ManyToOne } from "typeorm";
import { DALBaseModel } from '../interfaces/DALBaseModel.js';
import { PreferredDriver } from "./PreferredDriver.js";
import { MapCoordinate } from "./MapCoordinate.js";
export class Booking extends DALBaseModel {
}
__decorate([
    Column({ name: "user_InternalId", type: "varchar", length: 45, unique: false, nullable: false }),
    __metadata("design:type", String)
], Booking.prototype, "userInternalId", void 0);
__decorate([
    Column({ name: "source_coordinate_InternalId", type: "varchar", length: 45, unique: false, nullable: false }),
    __metadata("design:type", Object)
], Booking.prototype, "sourceCoordinateInternalId", void 0);
__decorate([
    Column({ name: "destination_coordinate_InternalId", type: "varchar", length: 45, unique: false, nullable: false }),
    __metadata("design:type", Object)
], Booking.prototype, "destinationCoordinateInternalId", void 0);
__decorate([
    Column({ name: "preferred_driver_InternalId", type: "varchar", length: 45, unique: false, nullable: false }),
    __metadata("design:type", Object)
], Booking.prototype, "preferredDriverInternalId", void 0);
__decorate([
    Column({ name: "trip_tier", type: "int", nullable: false }),
    __metadata("design:type", Number)
], Booking.prototype, "tripTier", void 0);
__decorate([
    Column({ name: "cost", type: "decimal", precision: 18, scale: 9, nullable: true }),
    __metadata("design:type", Object)
], Booking.prototype, "cost", void 0);
__decorate([
    Column({ name: "date_booked", type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "dateBooked", void 0);
__decorate([
    Column({ name: "scheduled_date", type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "scheduledDate", void 0);
__decorate([
    ManyToOne("User", (user) => user.confirmedBookings),
    JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", Function)
], Booking.prototype, "user", void 0);
__decorate([
    ManyToOne("MapCoordinate", (mapCoordinate) => mapCoordinate.InternalId),
    JoinColumn({ name: "source_coordinate_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", MapCoordinate)
], Booking.prototype, "sourceCoordinate", void 0);
__decorate([
    ManyToOne("MapCoordinate", (mapCoordinate) => mapCoordinate.InternalId),
    JoinColumn({ name: "destination_coordinate_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", MapCoordinate)
], Booking.prototype, "destinationCoordinate", void 0);
__decorate([
    ManyToOne("PreferredDriver", (preferredDriver) => preferredDriver.InternalId),
    JoinColumn({ name: "preferred_driver_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", PreferredDriver)
], Booking.prototype, "preferredDriver", void 0);
//# sourceMappingURL=Booking.js.map