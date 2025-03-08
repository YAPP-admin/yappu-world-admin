export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
}

export interface ErrorResponse {
  isSuccess: boolean;
  message: string;
  errorCode: string;
}
