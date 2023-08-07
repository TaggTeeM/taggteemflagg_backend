import { Entity, PrimaryGeneratedColumn, Column, Unique, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

import { DALBaseModel } from '../interfaces/DALBaseModel.ts';
import type { User } from "./User.ts";
import { PreferredDriver } from "./PreferredDriver.ts";
  
@Entity({ name: "drivers" })
@Unique(["userInternalId"])
export class Driver extends DALBaseModel {
    @Column({ type: "varchar", length: 45, name: "user_InternalId" })
    userInternalId: string;

    @OneToOne("User", (user: User) => user.driver)
    @JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" })
    user: User;

    @Index()
    @Column({ type: "tinyint", width: 1, transformer: {
        from: value => !!value,
        to: value => (value ? 1 : 0)
        }
    })
    approved: boolean;

    @Index()
    @Column({ type: "tinyint", width: 1, transformer: {
        from: value => !!value,
        to: value => (value ? 1 : 0)
        }
    })
    online: boolean;

    @OneToMany(() => PreferredDriver, preferredDriver => preferredDriver.driver)
    preferredBy: PreferredDriver[];
}
  