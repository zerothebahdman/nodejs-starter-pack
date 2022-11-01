import { Schema, model } from 'mongoose';
import { NewsInterface } from '../../../index';

const NewsSchema = new Schema<NewsInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: Date,
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

const News = model<NewsInterface>('News', NewsSchema);
export default News;
