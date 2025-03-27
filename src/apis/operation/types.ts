export interface OperationListRes {
  links: OperationListInfo[];
}

export interface OperationListInfo {
  id: string;
  label: string;
  value: string;
}
