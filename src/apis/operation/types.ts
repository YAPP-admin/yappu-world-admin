export interface OperationListRes {
  links: OperationListInfo[];
}

export interface OperationListInfo {
  id: string;
  label: string;
  value: string;
}

export interface OperationEditReq {
  id: string;
  name: string;
  link: string;
}

export interface GenerationListRes {
  generation: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface AddGenerationReq {
  generation: number | null;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
}

export interface EditGenerationReq {
  generation: number;
  targetActive: boolean;
}

export interface EditGenerationRes {
  activatedGeneration: number;
  deactivatedGeneration: number | null;
}
