import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from "typeorm";

import { DALBaseModel } from '../interfaces/DALBaseModel.ts';
import type { User } from "./User.ts";
import type { Driver } from "./Driver.ts";

@Entity({ name: "preferred_drivers" })
export class PreferredDriver extends DALBaseModel {
    @Index() 
    @ManyToOne("User", (user: User) => user.preferredDrivers)
    @JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" })
    user: User;

    @Index()
    @ManyToOne("Driver", (driver: Driver) => driver.preferredBy)
    @JoinColumn({ name: "driver_InternalId", referencedColumnName: "InternalId" })
    driver: Driver;
}
