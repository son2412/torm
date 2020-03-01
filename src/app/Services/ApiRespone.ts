export class ApiRespone {
  static item(data) {
    return { data };
  }

  static collection(data) {
    return { data };
  }

  static paginate() {}

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
