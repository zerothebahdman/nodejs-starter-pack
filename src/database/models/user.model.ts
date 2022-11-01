import { Schema, model } from 'mongoose';
import { UserInterface } from '../../../index';
import { ROLES } from '../../utils/constants';

const UserSchema = new Schema<UserInterface>(
  {
    title: String,
    firstName: {
      type: String,
      required: [true, 'Oops! you need to specify a name'],
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, 'Oops! you need to specify a name'],
      lowercase: true,
    },
    username: String,
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: {
      type: String,
      required: [true, 'Oops! you need to specify a phoneNumber'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [
        8,
        `Oops! your password needs to be at least 8 characters long`,
      ],
      select: false,
    },
    gender: { type: String, enum: ['male', 'female'], required: true },
    loanApplicationStatus: String,
    address: String,
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
    nextOfKin: String,
    nextOfKinAddress: String,
    bank: String,
    accountNumber: String,
    occupation: String,
    password_updated_at: Date,
    password_reset_token: String,
    password_reset_token_expires_at: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        delete ret.active;
        delete ret.password_reset_token;
        delete ret.password_reset_token_expires_at;
        delete ret.__v;
        delete ret.password;
        delete ret.password_reset;
        return ret;
      },
    },
    timestamps: true,
    toObject: { virtuals: true },
  }
);

const User = model<UserInterface>('User', UserSchema);
export default User;
