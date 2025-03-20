export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  size: number;
  totalPage: number;
}

export interface PaginatedApiResponse<T>
  extends ApiResponse<PaginatedResponse<T>> {}

export interface ErrorResponse {
  isSuccess: boolean;
  message: string;
  errorCode: string;
}

export interface PaginatedReq {
  page: number;
  size: number;
}
