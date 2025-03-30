import { FC } from 'react';
import styled from 'styled-components';

import Typography from '@compnents/commons/Typography';
import theme from 'styles/theme';

interface Props {
  generation: number;
  role: string;
  isActive?: boolean;
}

const GenerateInfo: FC<Props> = (props) => {
  const { generation, role } = props;

  return (
    <Container>
      <Typography
        variant="body1Normal"
        style={{
          color: theme.colors.label.normal,
        }}
      >
        {generation}기
      </Typography>
      <Typography
        variant="body1Normal"
        style={{
          color: theme.colors.label.normal,
        }}
      >
        {role}
      </Typography>
    </Container>
  );
};

export default GenerateInfo;

const Container = styled.div<{ width?: string }>`
  display: flex;
  gap: 24px;
  align-items: center;

  span:first-child {
    width: 100px;
  }
`;
