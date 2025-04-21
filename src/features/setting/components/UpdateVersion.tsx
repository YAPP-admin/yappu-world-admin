import { FC } from 'react';

import OutlinedButton from '@compnents/Button/OutlinedButton';
import GridBox from '@compnents/commons/GridBox';
import Typography from '@compnents/commons/Typography';
import { Version } from 'apis/operation/types';

interface Props {
  versionInfo: Version;
  onClick: (value: Version) => void;
}

const UpdateVersion: FC<Props> = ({ versionInfo, onClick }) => {
  return (
    <GridBox align="center" columns="80px 80px 1fr" gap={16}>
      <Typography variant="heading2Bold">{versionInfo.platform}</Typography>
      <Typography color="primary-normal" variant="heading2Bold">
        {versionInfo.version}
      </Typography>
      <OutlinedButton
        size="xsmall"
        variant="assistive"
        onClick={() => onClick(versionInfo)}
      >
        수정
      </OutlinedButton>
    </GridBox>
  );
};

export default UpdateVersion;
