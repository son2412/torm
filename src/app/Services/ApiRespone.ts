export class ApiRespone {
  static item(data) {
    return { data };
  }

  static collection(data) {
    return { data };
  }

  static paginate(data: any, param?: any) {
    const pageSize = param.pageSize || 10;
    const pageIndex = param.pageIndex || 1;
    return {
      data: data[0],
      totalRow: data[1],
      totalPage: Math.ceil(data[1] / pageSize),
      currentPage: pageIndex,
      perPage: pageSize
    };
  }

  static success() {
    return { success: true };
  }

  static error(error) {
    return {
      success: false,
      errorCode: error.errorCode || 0,
      message: error.message
    };
  }
}
