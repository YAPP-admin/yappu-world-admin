import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

interface Props {
  generation: number;
  role: string;
  isActive?: boolean;
}

const GenerateInfo: FC<Props> = (props) => {
  const { generation, role, isActive } = props;

  return (
    <Container>
      <Typography
        text={`${generation}기`}
        variatnt="body1Normal"
        style={{
          color: theme.colors.label.normal,
        }}
      />
      <Typography
        text={role}
        variatnt="body1Normal"
        style={{
          color: theme.colors.label.normal,
        }}
      />
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
