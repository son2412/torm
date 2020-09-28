export class ApiRespone {
  static item(data) {
    return { data, success: true };
  }

  static collection(data) {
    return { data, success: true };
  }

  static paginate(data: any) {
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
      message: error.message
    };
  }
}
