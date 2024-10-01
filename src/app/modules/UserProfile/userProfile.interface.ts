import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TUserProfile = {
  // _id?: Types.ObjectId;
  user: Types.ObjectId;
  username: string;
  email: string;
  name?: TUserName;
  profilePicture: string | null;
  bio?: string;
  // followers?: Types.ObjectId[];
  // following?: Types.ObjectId[];
  premiumMembership?: boolean;
  premiumExpiresAt?: Date | null;
  gender?: 'Male' | 'Female' | 'Other';
  dateOfBirth?: Date;
  contactNo?: string;
  presentAddress?: string;
  permanentAddress?: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  isDeleted?: boolean;
};

//for creating static
export interface UserProfileModel extends Model<TUserProfile> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TUserProfile | null>;
  isUserEmailExists(email: string): Promise<TUserProfile | null>;
}

