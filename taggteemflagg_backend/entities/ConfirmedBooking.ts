import { Entity, PrimaryGeneratedColumn, Column, Unique, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

import type { User } from "./User.js";
import { PreferredDriver } from "./PreferredDriver.js";
import { MapCoordinate } from "./MapCoordinate.js";
import { Booking } from "./Booking.js";
import { Driver } from "./Driver.js";
  
@Entity({ name: "confirmed_bookings" })
export class ConfirmedBooking extends Booking {
    @Column({ type: "timestamp", name: "driver_confirmation_timestamp", nullable: true })
    driverConfirmationTimestamp: Date | null;

    @Column({ type: "varchar", length: 255, name: "driver_name", nullable: true })
    driverName: string | null;
    
    @Column({ type: "int", name: "trip_rating", nullable: true })
    tripRating: number | null;
    
    @Column({ type: "timestamp", name: "pickup_timestamp", nullable: true })
    pickupTimestamp: Date | null;
    
    @Column({ type: "timestamp", name: "dropoff_timestamp", nullable: true })
    dropoffTimestamp: Date | null;

    @Column({ name: "pickup_coordinates_InternalId", type: "varchar", length: 45, unique: false, nullable: true })
    pickupCoordinatesInternalId: string | null;

    @Column({ name: "dropoff_coordinates_InternalId", type: "varchar", length: 45, unique: false, nullable: true })
    dropoffCoordinatesInternalId: string | null;

    @Column({ name: "distance_in_meters", type: "decimal", precision: 18, scale: 9, nullable: true })
    distanceInMeters: number | null;

    @Column({ name: "distance_in_feet", type: "decimal", precision: 18, scale: 9, nullable: true })
    distanceInFeet: number | null;

    @Column({ name: "duration_in_seconds", type: "decimal", precision: 18, scale: 9, nullable: true })
    durationInSeconds: number | null;

    @ManyToOne("Driver", (driver: Driver) => driver.InternalId)
    @JoinColumn({ name: "driver_InternalId", referencedColumnName: "InternalId" })
    driver: Driver | null;
    
    @ManyToOne("MapCoordinate", (mapCoordinate: MapCoordinate) => mapCoordinate.InternalId)
    @JoinColumn({ name: "pickup_coordinates_InternalId", referencedColumnName: "InternalId" })
    pickupCoordinates: MapCoordinate | null;

    @ManyToOne("MapCoordinate", (mapCoordinate: MapCoordinate) => mapCoordinate.InternalId)
    @JoinColumn({ name: "dropoff_coordinates_InternalId", referencedColumnName: "InternalId" })
    dropoffCoordinates: MapCoordinate | null;
}
  