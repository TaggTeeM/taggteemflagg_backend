var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column } from "typeorm";
import { DALBaseModel } from '../interfaces/DALBaseModel.js';
let MapCoordinate = class MapCoordinate extends DALBaseModel {
};
__decorate([
    Column({ type: "decimal", name: "latitude", precision: 18, scale: 9 }),
    __metadata("design:type", Number)
], MapCoordinate.prototype, "latitude", void 0);
__decorate([
    Column({ type: "decimal", name: "longitude", precision: 18, scale: 9 }),
    __metadata("design:type", Number)
], MapCoordinate.prototype, "longitude", void 0);
__decorate([
    Column({ type: "varchar", length: 2048, name: "address" }),
    __metadata("design:type", String)
], MapCoordinate.prototype, "address", void 0);
MapCoordinate = __decorate([
    Entity({ name: "map_coordinates" })
], MapCoordinate);
export { MapCoordinate };
//# sourceMappingURL=MapCoordinate.js.map