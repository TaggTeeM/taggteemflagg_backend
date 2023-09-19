var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, Unique, Index, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { DALBaseModel } from '../interfaces/DALBaseModel.js';
import { PreferredDriver } from "./PreferredDriver.js";
let Driver = class Driver extends DALBaseModel {
};
__decorate([
    Column({ type: "varchar", length: 45, name: "user_InternalId" }),
    __metadata("design:type", String)
], Driver.prototype, "userInternalId", void 0);
__decorate([
    Index(),
    Column({ type: "tinyint", width: 1, default: 0, transformer: {
            from: value => !!value,
            to: value => (value ? 1 : 0)
        }
    }),
    __metadata("design:type", Boolean)
], Driver.prototype, "approved", void 0);
__decorate([
    Index(),
    Column({ type: "tinyint", width: 1, default: 0, transformer: {
            from: value => !!value,
            to: value => (value ? 1 : 0)
        }
    }),
    __metadata("design:type", Boolean)
], Driver.prototype, "online", void 0);
__decorate([
    OneToOne("User", (user) => user.driver),
    JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", Function)
], Driver.prototype, "user", void 0);
__decorate([
    OneToMany(() => PreferredDriver, preferredDriver => preferredDriver.driver),
    __metadata("design:type", Array)
], Driver.prototype, "preferredBy", void 0);
Driver = __decorate([
    Entity({ name: "drivers" }),
    Unique("user_UNIQUE", ["userInternalId"])
], Driver);
export { Driver };
//# sourceMappingURL=Driver.js.map