import { FC } from 'react';
import styled from 'styled-components';

import Typography from '@compnents/commons/Typography';

interface Props {
  label: string;
  value: string;
}
const InfoGrid: FC<Props> = ({ label, value }) => (
  <GridRow>
    <Typography color="label-alternative" variant="body1Normal">
      {label}
    </Typography>
    <Typography color="label-normal" variant="body1Normal">
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
