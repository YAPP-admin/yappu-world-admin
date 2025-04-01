import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  value: string;
}
const InfoGrid: FC<Props> = ({ label, value }) => (
  <GridRow>
    <Typography variant="body1Normal" color="label-alternative">
      {label}
    </Typography>
    <Typography variant="body1Normal" color="label-normal">
      {value}
    </Typography>
  </GridRow>
);

export default InfoGrid;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px;
`;
