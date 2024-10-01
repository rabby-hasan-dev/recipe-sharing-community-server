import { Schema, model } from 'mongoose';
import {
  TUserName,
  TUserProfile,
  UserProfileModel,
} from './userProfile.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const UserProfileSchema = new Schema<TUserProfile, UserProfileModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: userNameSchema,
    },
    profilePicture: {
      type: String,
      default: '', // URL or path to the profile picture
    },
    bio: {
      type: String,
      default: '',
    },
    // followers: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'UserProfile',
    //   },
    // ],
    // following: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'UserProfile',
    //   },
    // ],
    premiumMembership: {
      type: Boolean,
      default: false,
    },
    premiumExpiresAt: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    dateOfBirth: {
      type: Date,
    },
    bloogGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    contactNo: {
      type: String,
      trim: true,
    },
    presentAddress: {
      type: String,
      trim: true,
    },
    permanentAddress: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);


// UserProfileSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

UserProfileSchema.virtual('fullName').get(function () {
  return ((this?.name?.firstName as string) + ' ' + this?.name?.lastName) as string;
});

// Query Middleware
UserProfileSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

UserProfileSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

UserProfileSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
UserProfileSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await UserProfile.findOne({ id });
  return existingUser;
};

UserProfileSchema.statics.isUserEmailExists = async function (email: string) {
  const existingUser = await UserProfile.findOne({ email });
  return existingUser;
};

export const UserProfile = model<TUserProfile, UserProfileModel>(
  'UserProfile',
  UserProfileSchema,
);
