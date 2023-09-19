import { Unique, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';  // Import the UUIDv4 function

@Unique(['InternalId'])
export abstract class DALBaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint', width: 1, default: 1, transformer: {
    from: value => !!value, // convert to boolean when getting data
    to: value => value ? 1 : 0 // convert to tinyint when saving data
  } })
  active: boolean;

  @Column({ name: "InternalId", type: 'varchar', length: 45, nullable: false, default: () => "(uuid())" })
  InternalId: string;

  @CreateDateColumn({ name: 'create_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createDate: Date;

  @UpdateDateColumn({ name: 'last_updated', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  lastUpdated: Date;

  constructor() {
    super();  // Call the parent constructor
    this.active = true;  // Default active to true
    this.InternalId = uuidv4();  // Default InternalId to a UUIDv4 string
  }
}
