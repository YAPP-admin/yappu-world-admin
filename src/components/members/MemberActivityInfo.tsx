import { FC } from 'react';
import styled from 'styled-components';

import Typography from '@compnents/commons/Typography';
import { UserDetailRes } from 'apis/user/types';
import theme from 'styles/theme';

import GenerateInfo from './GenerateInfo';

interface Props {
  userInfo: UserDetailRes | undefined;
}

const MemberActivityInfo: FC<Props> = (props) => {
  const { userInfo } = props;
  return (
    <div style={{ width: '286px' }}>
      <Typography variant="heading2Bold">활동 정보</Typography>
      <div className="wrapper">
        <Wrapper width="100px">
          <Typography
            variant="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
            }}
          >
            기수
          </Typography>
          <Typography
            variant="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
            }}
          >
            직군
          </Typography>
        </Wrapper>
        {userInfo?.activityUnits?.map((unit) => (
          <GenerateInfo
            key={`${unit.generation}-${unit.position}`}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
};

export default MemberActivityInfo;

const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  gap: 24px;
  align-items: center;

  span:first-child {
    width: 100px;
  }
`;
