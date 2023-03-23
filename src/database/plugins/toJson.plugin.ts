/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */
import config from '../../../config/default';
const deleteAtPath = (
  obj: { [x: string]: any },
  path: string | string[],
  index: number
) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

const toJSON = (schema: any) => {
  let transform: any;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(
      doc: any,
      ret: {
        id: any;
        _id: { toString: () => any };
        __v: any;
        createdAt: any;
        updatedAt: any;
      },
      options: any
    ) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;

      if (config.env === 'test') {
        delete ret.createdAt;
        delete ret.updatedAt;
      }
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

export default toJSON;
