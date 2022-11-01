import { Schema, model } from 'mongoose';
import auditableFields from '../plugins/auditableFields.plugin';
import { AccountInterface } from '../../../index';

const AccountSchema = new Schema<AccountInterface>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
    },
    accountInformation: {
      shareCapital: { type: Number, default: 0 },
      thriftSavings: { type: Number, default: 0 },
      commodityTrading: { type: Number, default: 0 },
      specialDeposit: { type: Number, default: 0 },
      fine: { type: Number, default: 0 },
      loan: { type: Number, default: 0 },
      projectFinancing: { type: Number, default: 0 },
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    debt: {
      type: Number,
      default: 0,
      min: 0,
    },
    ...auditableFields,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

const Account = model<AccountInterface>('Account', AccountSchema);
export default Account;
