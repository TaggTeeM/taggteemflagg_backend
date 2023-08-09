import { Entity, Column } from "typeorm";
import { DALBaseModel } from '../interfaces/DALBaseModel.ts';

@Entity({ name: "map_coordinates" })
export class MapCoordinate extends DALBaseModel {
    
    @Column({ type: "decimal", name: "latitude" })
    latitude: number;

    @Column({ type: "decimal", name: "longitude" })
    longitude: number;

    @Column({ type: "varchar", length: 1024, name: "address" })
    address: string;
}
