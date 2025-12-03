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
