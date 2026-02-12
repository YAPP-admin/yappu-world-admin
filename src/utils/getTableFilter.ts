import { positionOptionList, statusOptionList } from '@constants/optionList';
import { GenerationListRes } from 'apis/operation/types';

export const memberListFilterTypeMap: Record<
  string,
  'generation' | 'position' | 'role' | null
> = {
  최근활동기수: 'generation',
  직군: 'position',
  권한: 'role',
};

export const applicationFilterTypeMap: Record<
  string,
  'generation' | 'position' | 'status' | null
> = {
  활동기수: 'generation',
  직군: 'position',
  상태: 'status',
};

export const getApplicationFilterConfig = (
  generationData?: GenerationListRes[],
) => ({
  generation: {
    title: '기수',
    getOptions: () =>
      generationData?.map((g) => ({
        label: `${g.generation}기`,
        value: g.generation.toString(),
      })) ?? [],
  },
  position: {
    title: '직군',
    getOptions: () => positionOptionList,
  },
  status: {
    title: '상태',
    getOptions: () => statusOptionList,
  },
});
