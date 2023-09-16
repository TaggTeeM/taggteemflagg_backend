import { Entity, Column } from "typeorm";
import { DALBaseModel } from '../interfaces/DALBaseModel.ts';

@Entity({ name: "map_coordinates" })
export class MapCoordinate extends DALBaseModel {
    
    @Column({ type: "decimal", name: "latitude", precision: 18, scale: 9 })
    latitude: number;

    @Column({ type: "decimal", name: "longitude", precision: 18, scale: 9 })
    longitude: number;

    @Column({ type: "varchar", length: 2048, name: "address" })
    address: string;
}
