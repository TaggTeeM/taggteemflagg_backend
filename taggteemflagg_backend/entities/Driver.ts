import { Entity, PrimaryGeneratedColumn, Column, Unique, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

import { DALBaseModel } from '../interfaces/DALBaseModel.js';
import type { User } from "./User.js";
import { PreferredDriver } from "./PreferredDriver.js";
  
@Entity({ name: "drivers" })
@Unique("user_UNIQUE", ["userInternalId"])
export class Driver extends DALBaseModel {
    @Column({ type: "varchar", length: 45, name: "user_InternalId" })
    userInternalId: string;

    @Index()
    @Column({ type: "tinyint", width: 1, default: 0, transformer: {
        from: value => !!value,
        to: value => (value ? 1 : 0)
        }
    })
    approved: boolean;

    @Index()
    @Column({ type: "tinyint", width: 1, default: 0, transformer: {
        from: value => !!value,
        to: value => (value ? 1 : 0)
        }
    })
    online: boolean;

    @OneToOne("User", (user: User) => user.driver)
    @JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" })
    user: User;

    @OneToMany(() => PreferredDriver, preferredDriver => preferredDriver.driver)
    preferredBy: PreferredDriver[];
}
  