import { PaginationOptions, PaginationModel } from '../../utils/index';
import { Schema, Model } from 'mongoose';
// import { PaginationOptions } from '../../utils/index';

export interface Pagination<T> extends Model<T> {
  paginate(
    filter: Partial<T>,
    options?: PaginationOptions | undefined
  ): Promise<PaginationModel<T> | undefined>;
}
const paginate = <T>(schema: Schema<T>): void => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (
    filter: Partial<T>,
    options: PaginationOptions
  ): Promise<{
    data: T[];
    page: number;
    limit: number;
    totalPages: number;
    totalData: number;
  }> {
    let sort = '';

    if (options.sortBy) {
      const sortingCriteria: string[] = [];
      options.sortBy.split(',').forEach((sortOption: string) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit =
      options.limit && parseInt(options?.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;
    const page =
      options.page && parseInt(options?.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select(options.select);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption: string) => {
        docsPromise = docsPromise.populate(populateOption);
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalData, data] = values;
      const totalPages = Math.ceil(totalData / limit);
      const result = {
        data,
        page,
        limit,
        totalPages,
        totalData,
      };
      return Promise.resolve(result);
    });
  };
};

export default paginate;
