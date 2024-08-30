export interface CommonResponse<T> {
  data: T;
}

export interface PageResponse<T> extends PageData {
  contents: T[];
}

export interface PageData {
  pageNumber: number;
  numberOfElements: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}
