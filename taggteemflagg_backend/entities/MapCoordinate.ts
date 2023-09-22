import { Entity, Column, Unique } from "typeorm";
import { DALBaseModel } from '../interfaces/DALBaseModel.js';

@Entity({ name: "map_coordinates" })
@Unique("lat_long_UNIQUE", ["latitude", "longitude"])
export class MapCoordinate extends DALBaseModel {
    
    @Column({ type: "decimal", name: "latitude", precision: 18, scale: 9 })
    latitude: number;

    @Column({ type: "decimal", name: "longitude", precision: 18, scale: 9 })
    longitude: number;

    @Column({ type: "varchar", length: 2048, name: "address" })
    address: string;
}
