export class ApiRespone {
  static item(data) {
    return { data };
  }

  static collection(data) {
    return { data };
  }

  static paginate(data: any) {
    return {
      data: data.data,
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
      errorCode: error.errorCode || 0,
      message: error.message
    };
  }
}
