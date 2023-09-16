import { Entity, Column, JoinColumn, Unique, ManyToOne, PrimaryGeneratedColumn, Index } from "typeorm";

import { DALBaseModel } from '../interfaces/DALBaseModel.ts';
import type { User } from "./User.ts";
import type { Driver } from "./Driver.ts";

@Entity({ name: "preferred_drivers" })
@Unique("user_driver_UNIQUE", [ "userInternalId", "driverInternalId" ])
export class PreferredDriver extends DALBaseModel {
    @Index()
    @Column({ name: "user_InternalId", type: "varchar", length: 45, unique: false, nullable: false })
    userInternalId: string | null;

    @Column({ name: "driver_InternalId", type: "varchar", length: 45, unique: false, nullable: false })
    driverInternalId: string | null;

    @ManyToOne("User", (user: User) => user.preferredDrivers)
    @JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" })
    user: User;

    @ManyToOne("Driver", (driver: Driver) => driver.preferredBy)
    @JoinColumn({ name: "driver_InternalId", referencedColumnName: "InternalId" })
    driver: Driver;
}
