import { Entity, Column, Unique, OneToMany, OneToOne } from 'typeorm';

import { DALBaseModel } from '../interfaces/DALBaseModel.ts';
import { PreferredDriver } from "./PreferredDriver.ts";
import { Driver } from './Driver.ts';

@Entity({ name: "users" })
@Unique(["phoneNumber"]) // Adding a unique constraint on phone_number
export class User extends DALBaseModel {
    @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: true })
    firstName: string;
    
    @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true })
    lastName: string;
    
    @Column({ name: 'phone_number', type: 'varchar', length: 25 })
    phoneNumber: string;
    
    @Column({ name: 'email', type: 'varchar', length: 255, nullable: true })
    email: string;

    @Column({ name: 'home_address_1', type: 'varchar', length: 512, nullable: true })
    homeAddress1: string;
    
    @Column({ name: 'home_address_2', type: 'varchar', length: 512, nullable: true }) // Assuming address 2 can be nullable
    homeAddress2: string;

    @Column({ name: 'home_city', type: 'varchar', length: 255, nullable: true })
    homeCity: string;

    @Column({ name: 'home_state', type: 'varchar', length: 128, nullable: true })
    homeState: string;

    @Column({ name: 'home_zip_code', type: 'varchar', length: 10, nullable: true }) // Adjusted length to common zip code formats
    homeZipCode: string;

    @Column({ name: 'home_phone_number', type: 'varchar', length: 25, nullable: true })
    homePhoneNumber: string;

    @Column({ name: 'failed_attempts', type: 'int', default: 0 }) // Defaults to 0
    failedAttempts: number;

    @Column({ name: 'locked', type: 'tinyint', width: 1, default: 0 }) // 1 for true/locked, 0 for false/unlocked
    locked: number; // Consider using boolean if your DB supports it

    @OneToOne("Driver", (driver: Driver) => driver.user, { nullable: true }) // Setting up a one-to-one relationship with Driver
    driver: Driver | null; // The type here can be Driver or null since it allows nulls

    @OneToMany(() => PreferredDriver, preferredDriver => preferredDriver.user)
    preferredDrivers: PreferredDriver[];
}
