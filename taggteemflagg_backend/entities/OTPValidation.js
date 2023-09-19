var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { DALBaseModel } from '../interfaces/DALBaseModel.js';
export var OTPType;
(function (OTPType) {
    OTPType["PHONE"] = "phone";
    OTPType["EMAIL"] = "email";
})(OTPType || (OTPType = {}));
let OTPValidation = class OTPValidation extends DALBaseModel {
};
__decorate([
    Column({ name: 'user_InternalId', type: 'varchar', length: 45 }),
    __metadata("design:type", String)
], OTPValidation.prototype, "userInternalId", void 0);
__decorate([
    Column("int"),
    __metadata("design:type", Number)
], OTPValidation.prototype, "otp", void 0);
__decorate([
    Column({ name: 'otp_type', type: 'enum', enum: OTPType }),
    __metadata("design:type", String)
], OTPValidation.prototype, "otpType", void 0);
__decorate([
    Column({ type: 'tinyint', width: 1, default: 0, transformer: {
            from: value => !!value,
            to: value => value ? 1 : 0 // convert to tinyint when saving
        } }),
    __metadata("design:type", Boolean)
], OTPValidation.prototype, "validated", void 0);
__decorate([
    ManyToOne("User", (user) => user.otpValidations),
    JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" }),
    __metadata("design:type", Object)
], OTPValidation.prototype, "user", void 0);
OTPValidation = __decorate([
    Entity({ name: "otp_validations" }),
    Index('user_InternalId_INDEX', ['userInternalId']),
    Index('user_type_INDEX', ['userInternalId', 'otpType'])
], OTPValidation);
export { OTPValidation };
//# sourceMappingURL=OTPValidation.js.map