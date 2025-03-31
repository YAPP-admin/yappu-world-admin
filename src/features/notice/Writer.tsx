import Person from '@assets/Person';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import theme from 'styles/theme';

interface Props {
  name: string;
}

const Writer: FC<Props> = ({ name }) => {
  return (
    <FlexBox gap={8} align="center" width="fit-content">
      <Person size="16" color={theme.colors.label.assistive} />
      <Typography variant="label1Regular" color="label-assistive">
        {name}
      </Typography>
    </FlexBox>
  );
};

export default Writer;
