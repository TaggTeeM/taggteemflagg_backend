var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Unique, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Import the UUIDv4 function
let DALBaseModel = class DALBaseModel extends BaseEntity {
    constructor() {
        super(); // Call the parent constructor
        this.active = true; // Default active to true
        this.InternalId = uuidv4(); // Default InternalId to a UUIDv4 string
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], DALBaseModel.prototype, "id", void 0);
__decorate([
    Column({ type: 'tinyint', width: 1, default: 1, transformer: {
            from: value => !!value,
            to: value => value ? 1 : 0 // convert to tinyint when saving data
        } }),
    __metadata("design:type", Boolean)
], DALBaseModel.prototype, "active", void 0);
__decorate([
    Column({ name: "InternalId", type: 'varchar', length: 45, nullable: false, default: () => "(uuid())" }),
    __metadata("design:type", String)
], DALBaseModel.prototype, "InternalId", void 0);
__decorate([
    CreateDateColumn({ name: 'create_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' }),
    __metadata("design:type", Date)
], DALBaseModel.prototype, "createDate", void 0);
__decorate([
    UpdateDateColumn({ name: 'last_updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' }),
    __metadata("design:type", Date)
], DALBaseModel.prototype, "lastUpdated", void 0);
DALBaseModel = __decorate([
    Unique(['InternalId']),
    __metadata("design:paramtypes", [])
], DALBaseModel);
export { DALBaseModel };
//# sourceMappingURL=DALBaseModel.js.map