import { FC } from 'react';

import Person from '@assets/Person';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import theme from 'styles/theme';

interface Props {
  name: string;
}

const Writer: FC<Props> = ({ name }) => {
  return (
    <FlexBox align="center" gap={8} width="fit-content">
      <Person color={theme.colors.label.assistive} size="16" />
      <Typography color="label-assistive" variant="label1Regular">
        {name}
      </Typography>
    </FlexBox>
  );
};

export default Writer;
