import { Entity, Column, Index, ManyToOne, JoinColumn, Relation } from 'typeorm';

import { DALBaseModel } from '../interfaces/DALBaseModel.js';
import { User } from './User.js';

export enum OTPType {
  PHONE = "phone",
  EMAIL = "email"
}

@Entity({ name: "otp_validations" })
@Index('user_InternalId_INDEX', ['userInternalId'])
@Index('user_type_INDEX', ['userInternalId', 'otpType'])
export class OTPValidation extends DALBaseModel {
  @Column({ name: 'user_InternalId', type: 'varchar', length: 45 })
  userInternalId: string;

  @Column("int")
  otp: number;

  @Column({ name: 'otp_type', type: 'enum', enum: OTPType })
  otpType: OTPType;

  @Column({ type: 'tinyint', width: 1, default: 0, transformer: {
    from: value => !!value, // convert to boolean when selecting data
    to: value => value ? 1 : 0 // convert to tinyint when saving
  } }) 
  validated: boolean; // 1 for true/locked, 0 for false/unlocked

  @ManyToOne("User", (user: User) => user.otpValidations)
  @JoinColumn({ name: "user_InternalId", referencedColumnName: "InternalId" })
  user: Relation<User>;
}
