import { ChipColor, ChipStyle } from '@compnents/commons/Chip';
import { SessionType } from 'apis/session/types';

interface SessionReturnType {
  text: string;
  color: ChipColor;
  style: ChipStyle;
}

export const getSessionType = (type?: SessionType): SessionReturnType => {
  switch (type) {
    case 'OFFLINE':
      return { text: '오프라인', color: 'primary', style: 'weak' };
    case 'ONLINE':
      return { text: '온라인', color: 'secondary', style: 'weak' };
    case 'TEAM':
      return { text: '팀', color: 'secondary', style: 'fill' };
    default:
      return { text: '', color: 'secondary', style: 'fill' };
  }
};
