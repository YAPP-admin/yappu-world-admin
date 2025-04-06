import { FC } from 'react';
import styled from 'styled-components';

import Chip from '@compnents/commons/Chip';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import { ActivityUnit } from 'apis/user/types';
import theme from 'styles/theme';

interface Props {
  unit: ActivityUnit;
}

const GenerateInfo: FC<Props> = (props) => {
  const { unit } = props;

  return (
    <Container>
      <FlexBox align="center" gap={8} width="100px">
        <Typography
          variant="body1Normal"
          style={{
            color: theme.colors.label.normal,
          }}
        >
          {unit.generation}기
        </Typography>
        {unit.isActive && <Chip text="진행중" />}
      </FlexBox>
      <Typography
        variant="body1Normal"
        style={{
          color: theme.colors.label.normal,
        }}
      >
        {unit.position}
      </Typography>
    </Container>
  );
};

export default GenerateInfo;

const Container = styled.div<{ width?: string }>`
  display: flex;
  gap: 24px;
  align-items: center;

  /* span:first-child {
    width: 100px;
  } */
`;
