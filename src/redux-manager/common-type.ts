export interface RequestError {
  errors: {
    message: string[];
    error: string;
    stack: string;
  }
  statusCode: number;
  success: boolean;
}

export interface CommonFetchParams {
  isRequesting?: boolean;
  isLoadMore?: boolean;
  requestError?: RequestError;
  payload?: any;
  response?: any;
}
