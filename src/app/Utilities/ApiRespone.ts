import * as _ from 'lodash';
import { Exception } from './Exception';
export class ApiRespone {
  static item(data) {
    if (_.isArray(data)) {
      throw new Exception('Select Api Response Invalid!');
    }
    return { data, success: true };
  }

  static collection(data) {
    if (!_.isArray(data)) {
      throw new Exception('Select Api Response Invalid!');
    }
    return { data, success: true };
  }

  static paginate(data: any) {
    if (!_.isArray(data.data) || data.totalRow === undefined) {
      throw new Exception('Select Api Response Invalid!');
    }
    return {
      data: data.data,
      success: true,
      totalRow: data.totalRow,
      totalPage: data.totalPage,
      currentPage: data.currentPage,
      perPage: data.perPage
    };
  }

  static success() {
    return { success: true };
  }

  static error(error) {
    return {
      success: false,
      errorCode: error.errorCode || 500,
      message: error.message,
      errorText: error.errorText
    };
  }
}
