var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, Unique, OneToMany, OneToOne } from 'typeorm';
import { DALBaseModel } from '../interfaces/DALBaseModel.js';
import { PreferredDriver } from "./PreferredDriver.js";
import { ConfirmedBooking } from './ConfirmedBooking.js';
import { OTPValidation } from './OTPValidation.js';
let User = class User extends DALBaseModel {
};
__decorate([
    Column({ name: 'first_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    Column({ name: 'last_name', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    Column({ name: 'phone_number', type: 'varchar', length: 25 }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    Column({ name: 'email', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ name: 'home_address_1', type: 'varchar', length: 512, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "homeAddress1", void 0);
__decorate([
    Column({ name: 'home_address_2', type: 'varchar', length: 512, nullable: true }) // Assuming address 2 can be nullable
    ,
    __metadata("design:type", String)
], User.prototype, "homeAddress2", void 0);
__decorate([
    Column({ name: 'home_city', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "homeCity", void 0);
__decorate([
    Column({ name: 'home_state', type: 'varchar', length: 128, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "homeState", void 0);
__decorate([
    Column({ name: 'home_zip_code', type: 'varchar', length: 10, nullable: true }) // Adjusted length to common zip code formats
    ,
    __metadata("design:type", String)
], User.prototype, "homeZipCode", void 0);
__decorate([
    Column({ name: 'home_phone_number', type: 'varchar', length: 25, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "homePhoneNumber", void 0);
__decorate([
    Column({ name: 'failed_attempts', type: 'int', default: 0 }) // Defaults to 0
    ,
    __metadata("design:type", Number)
], User.prototype, "failedAttempts", void 0);
__decorate([
    Column({ name: 'locked', type: 'tinyint', width: 1, default: 1, transformer: {
            from: value => !!value,
            to: value => value ? 1 : 0 // convert to tinyint when saving
        } }),
    __metadata("design:type", Boolean)
], User.prototype, "locked", void 0);
__decorate([
    Column({ name: 'phone_validated', type: 'tinyint', width: 1, default: 0, transformer: {
            from: value => !!value,
            to: value => value ? 1 : 0 // convert to tinyint when saving
        } }),
    __metadata("design:type", Boolean)
], User.prototype, "phoneValidated", void 0);
__decorate([
    Column({ name: 'email_validated', type: 'tinyint', width: 1, default: 0, transformer: {
            from: value => !!value,
            to: value => value ? 1 : 0 // convert to tinyint when saving
        } }),
    __metadata("design:type", Boolean)
], User.prototype, "emailValidated", void 0);
__decorate([
    OneToOne("Driver", (driver) => driver.user, { nullable: true }) // Setting up a one-to-one relationship with Driver
    ,
    __metadata("design:type", Object)
], User.prototype, "driver", void 0);
__decorate([
    OneToMany(() => PreferredDriver, preferredDriver => preferredDriver.user),
    __metadata("design:type", Array)
], User.prototype, "preferredDrivers", void 0);
__decorate([
    OneToMany(() => ConfirmedBooking, confirmedBooking => confirmedBooking.user),
    __metadata("design:type", Array)
], User.prototype, "confirmedBookings", void 0);
__decorate([
    OneToMany(() => OTPValidation, otpValidation => otpValidation.user),
    __metadata("design:type", Array)
], User.prototype, "otpValidations", void 0);
User = __decorate([
    Entity({ name: "users" }),
    Unique(["phoneNumber"]) // Adding a unique constraint on phone_number
    ,
    Unique(["email"]) // Adding a unique constraint on email
], User);
export { User };
//# sourceMappingURL=User.js.map