import { FC, useMemo } from 'react';
import styled from 'styled-components';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import { useAttendancesQuery } from '@queries/attendance/useAttendancesQuery';
import { AttendanceStatusType } from 'apis/attendance/types';
import AttandanceTable from 'features/attendance/AttendanceTable';
import SummaryTable from 'features/attendance/SummaryTable';

const Attendances: FC = () => {
  const { data } = useAttendancesQuery();

  const sessionMap = useMemo(() => {
    return data?.attendancesGroupedBySession.reduce(
      (acc, group) => {
        acc[group.sessionId] = group.attendances.reduce(
          (userMap, status) => {
            userMap[status.userId] = status.status;
            return userMap;
          },
          {} as Record<string, AttendanceStatusType | null>,
        );
        return acc;
      },
      {} as Record<string, Record<string, AttendanceStatusType | null>>,
    );
  }, [data?.attendancesGroupedBySession]);

  return (
    <Container>
      <Typography variant="title2Bold">출석관리</Typography>
      <FlexBox justify="space-between" width="100%">
        <FlexBox align="center" gap={8} justify="center" width="fit-content">
          <Typography variant="headline1Bold">26기</Typography>
          <Typography color="label-assistive" variant="body1Normal">
            {data?.users.length}명
          </Typography>
        </FlexBox>
        <OutlinedButton size="xsmall" variant="assistive">
          수정
        </OutlinedButton>
      </FlexBox>
      <Wrapper>
        <AttandanceTable
          sessionMap={sessionMap}
          sessions={data?.sessions}
          users={data?.users}
        />
        <SummaryTable sessions={data?.sessions} users={data?.users} />
      </Wrapper>
    </Container>
  );
};

export default Attendances;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px 40px;
  max-width: 1126px;
`;

const Wrapper = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
