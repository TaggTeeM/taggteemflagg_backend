import { DALBaseModel } from '../interfaces/DALBaseModel.ts';
import { Entity, Column, Index } from 'typeorm';

@Entity({ name: "otp_validations" })
@Index('user_InternalId_INDEX', ['userInternalId'])
export class OTPValidation extends DALBaseModel {
  @Column({ name: 'user_InternalId', type: 'varchar', length: 45 })
  userInternalId: string;

  @Column("int")
  otp: number;

  @Column({ type: 'tinyint', width: 1, default: 0, transformer: {
    from: value => !!value, // convert to boolean when selecting data
    to: value => value ? 1 : 0 // convert to tinyint when saving
  } }) 
  validated: boolean; // 1 for true/locked, 0 for false/unlocked
}