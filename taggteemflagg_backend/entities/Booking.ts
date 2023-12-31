import { Entity, PrimaryGeneratedColumn, Column, Unique, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

import { DALBaseModel } from '../interfaces/DALBaseModel.js';
import type { User } from "./User.js";
import { PreferredDriver } from "./PreferredDriver.js";
import { MapCoordinate } from "./MapCoordinate.js";
  
export class Booking extends DALBaseModel {
    @Column({ name: "user_InternalId", type: "varchar", length: 45, unique: false, nullable: false })
    userInternalId: string;

    @Column({ name: "source_coordinate_InternalId", type: "varchar", length: 45, unique: false, nullable: false })
    sourceCoordinateInternalId: string | null;

    @Column({ name: "destination_coordinate_InternalId", type: "varchar", length: 45, unique: false, nullable: false })
    destinationCoordinateInternalId: string | null;

    @Column({ name: "preferred_driver_InternalId", type: "varchar", length: 45, unique: false, nullable: true })
    preferredDriverInternalId: string | null;

    @Column({ name: "trip_tier", type: "int", nullable: false, default: -1 })
    tripTier: number;

    @Column({ name: "cost", type: "decimal", precision: 18, scale: 9, nullable: true })
    cost: number | null;
    
    @Column({ name: "date_booked", type: "timestamp", nullable: true })
    dateBooked: Date;

    @Column({ name: "scheduled_date", type: "timestamp", nullable: true })
    scheduledDate: Date;


    @ManyToOne("User", (user: User) => user.confirmedBookings)
    @JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" })
    user: User;

    @ManyToOne("MapCoordinate", (mapCoordinate: MapCoordinate) => mapCoordinate.InternalId)
    @JoinColumn({ name: "source_coordinate_InternalId", referencedColumnName: "InternalId" })
    sourceCoordinate: MapCoordinate | null;

    @ManyToOne("MapCoordinate", (mapCoordinate: MapCoordinate) => mapCoordinate.InternalId)
    @JoinColumn({ name: "destination_coordinate_InternalId", referencedColumnName: "InternalId" })
    destinationCoordinate: MapCoordinate | null;

    @ManyToOne("PreferredDriver", (preferredDriver: PreferredDriver) => preferredDriver.InternalId)
    @JoinColumn({ name: "preferred_driver_InternalId", referencedColumnName: "InternalId" })
    preferredDriver: PreferredDriver | null;
}
  