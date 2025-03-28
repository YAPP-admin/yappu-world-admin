import Typography from '@compnents/commons/Typography';
import { UserDetailRes } from 'apis/user/types';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import GenerateInfo from './GenerateInfo';

interface Props {
  userInfo: UserDetailRes | null;
}

const MemberActivityInfo: FC<Props> = (props) => {
  const { userInfo } = props;
  return (
    <div style={{ width: '286px' }}>
      <Typography children="활동 정보" variant="heading2Bold" />
      <div className="wrapper">
        <Wrapper width="100px">
          <Typography
            children="기수"
            variant="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
            }}
          />
          <Typography
            children="직군"
            variant="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
            }}
          />
        </Wrapper>
        {userInfo?.activityUnits?.map((el) => (
          <GenerateInfo
            key={`${el.generation}-${el.position}`}
            generation={el.generation}
            role={el.position}
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
