import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TAdmin = {
  user: Types.ObjectId;
  username: string;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  bloogGroup?: TBloodGroup;
  presentAddress?: string;
  permanentAddress?: string;
  profilePicture?: string;
  isDeleted?: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>;
}
