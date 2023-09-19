var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, JoinColumn, Unique, ManyToOne, Index } from "typeorm";
import { DALBaseModel } from '../interfaces/DALBaseModel.js';
let PreferredDriver = class PreferredDriver extends DALBaseModel {
};
__decorate([
    Index(),
    Column({ name: "user_InternalId", type: "varchar", length: 45, unique: false, nullable: false }),
    __metadata("design:type", Object)
], PreferredDriver.prototype, "userInternalId", void 0);
__decorate([
    Column({ name: "driver_InternalId", type: "varchar", length: 45, unique: false, nullable: false }),
    __metadata("design:type", Object)
], PreferredDriver.prototype, "driverInternalId", void 0);
__decorate([
    ManyToOne("User", (user) => user.preferredDrivers),
    JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", Function)
], PreferredDriver.prototype, "user", void 0);
__decorate([
    ManyToOne("Driver", (driver) => driver.preferredBy),
    JoinColumn({ name: "driver_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", Function)
], PreferredDriver.prototype, "driver", void 0);
PreferredDriver = __decorate([
    Entity({ name: "preferred_drivers" }),
    Unique("user_driver_UNIQUE", ["userInternalId", "driverInternalId"])
], PreferredDriver);
export { PreferredDriver };
//# sourceMappingURL=PreferredDriver.js.map