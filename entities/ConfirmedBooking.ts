import { Entity, PrimaryGeneratedColumn, Column, Unique, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

import { DALBaseModel } from '../interfaces/DALBaseModel.ts';
import type { User } from "./User.ts";
import { PreferredDriver } from "./PreferredDriver.ts";
import { MapCoordinate } from "./MapCoordinate.ts";
import { Booking } from "./Booking.ts";
import { Driver } from "./Driver.ts";
  
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

    @ManyToOne("Driver", (driver: Driver) => driver.InternalId)
    @JoinColumn({ name: "driver_InternalId", referencedColumnName: "InternalId" })
    driver: Driver;
    
    @ManyToOne("MapCoordinate", (mapCoordinate: MapCoordinate) => mapCoordinate.InternalId)
    @JoinColumn({ name: "pickup_coordinates_InternalId", referencedColumnName: "InternalId" })
    pickupCoordinates: MapCoordinate;

    @ManyToOne("MapCoordinate", (mapCoordinate: MapCoordinate) => mapCoordinate.InternalId)
    @JoinColumn({ name: "dropoff_coordinates_InternalId", referencedColumnName: "InternalId" })
    dropoffCoordinates: MapCoordinate;
}
  