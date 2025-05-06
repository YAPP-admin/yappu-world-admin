import { FC } from 'react';
import styled from 'styled-components';

import SolidButton from '@compnents/Button/SolidButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import AttandanceTable from 'features/attendance/AttendanceTable';

const Attendances: FC = () => {
  return (
    <Container>
      <FlexBox justify="space-between" width="100%">
        <Typography variant="title2Bold">출석관리</Typography>
        <SolidButton size="medium" variant="primary">
          일괄변경
        </SolidButton>
      </FlexBox>
      <AttandanceTable />
    </Container>
  );
};

export default Attendances;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 40px;
  max-width: 1126px;
`;
