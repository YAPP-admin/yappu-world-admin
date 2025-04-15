export type ScheduleType = 'SESSION' | 'TASK' | 'ETC';
export type SessionType = 'OFFLINE' | 'ONLINE' | 'TEAM';

export interface SessionRes {
  id: string;
  generation: number;
  type: SessionType;
  title: string;
  place: string;
  date: string;
  time: string;
  endTime: string;
}

export interface SesseionReq {
  name: string;
  place: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  generation: number;
  type: ScheduleType; // 항상 SESSION
  sessionType: SessionType;
}

export interface EditSessionReq {
  id: string;
  name: string;
  place: string;
  date: string;
  endDate: string;
  time: string;
  endTime: string;
  generation: number;
  sessionType: SessionType;
}

export interface DeleteSessionReq {
  ids: string[];
}

export interface SessionDetailRes {
  id: string;
  name: string;
  generation: number;
  place: string;
  date: string;
  time: string;
  endTime: string;
  sessionType: SessionType;
}
