import { RoleName, UserRole } from 'apis/user/types';

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface MemberCodeRes {
  code: string;
  role: UserRole;
}

export interface MemberCodeReq {
  role: RoleName;
  code: string;
}

// 가입신청 거절
export interface ApplicationRejectReq {
  applicationIds: string[];
  reason: string;
}

// 가입신청 승인
export interface ApplicationApproveReq {
  applicationIds: string[];
  role: RoleName;
}

// 유저 역할 변경
export interface EidtUserRoleReq {
  userId: string;
  role: RoleName;
}

// 가입신청 목록 조회
export interface ApplicationListRes {
  applicationId: string;
  name: string;
  email: string;
  applicationDate: string;
  activityUnit: {
    generation: number;
    position: {
      name: string;
      label: string;
    };
  };
  status: string;
}

// 가입신청 상세
export interface ApplicationDetailRes {
  details: {
    name: string;
    email: string;
    applicationDate: string;
    activityUnits: [
      {
        generation: number;
        position: {
          name: string;
          label: string;
        };
      },
    ];
  };
  status: string;
  rejectReason: string | null;
  assignedRole: string | null;
}
