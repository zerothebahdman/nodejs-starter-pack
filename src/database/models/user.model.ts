/* eslint-disable no-param-reassign */
import { Schema, model } from 'mongoose';
import paginate, { Pagination } from '../plugins/paginate.plugin';
import toJSON from '../plugins/toJson.plugin';
import { GENDER } from '../../../config/constants';
import auditableFields from '../plugins/auditableFields.plugin';
import { UserInterface } from '../../utils/index';

const userSchema = new Schema<UserInterface>(
  {
    fullName: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
      trim: true,
    },
    residentialAddress: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerifiedAt: Date,
    emailVerificationToken: String,
    emailVerificationTokenExpiry: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresAt: Date,
    pushNotificationId: String,
    userAppVersion: String,
    gender: {
      type: String,
      enum: Object.values(GENDER),
    },
    otpLogin: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
      trim: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    referralCode: String,
    inviteCode: String,
    deviceInfo: [Map],
    ...auditableFields,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        delete ret.passwordResetToken;
        delete ret.passwordResetTokenExpiresAt;
        delete ret.__v;
        delete ret.password;
        delete ret.emailVerificationTokenExpiry;
        return ret;
      },
    },
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * @typedef User
 */
const User: Pagination<UserInterface> = model<
  UserInterface,
  Pagination<UserInterface>
>('User', userSchema);

export default User;
