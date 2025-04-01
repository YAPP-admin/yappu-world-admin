import { FC } from 'react';
import styled from 'styled-components';

import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import { UserDetailRes } from 'apis/user/types';
import theme from 'styles/theme';

interface Props {
  userInfo: UserDetailRes | null;
}

const MemberBasicInfo: FC<Props> = (props) => {
  const { userInfo } = props;
  return (
    <div
      style={{
        flex: '1 0 0',
        borderRight: `1px solid ${theme.colors.lineNormal.normal}`,
      }}
    >
      <Typography variant="heading2Bold">기본정보</Typography>
      <div className="wrapper">
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            이름
          </Typography>
          <Typography
            style={{ color: theme.colors.label.normal }}
            variant="body1Normal"
          >
            {userInfo?.name}
          </Typography>
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            이메일
          </Typography>
          <Typography
            style={{ color: theme.colors.label.normal }}
            variant="body1Normal"
          >
            {userInfo?.email}
          </Typography>
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            전화번호
          </Typography>
          <Typography
            style={{ color: theme.colors.label.normal }}
            variant="body1Normal"
          >
            {userInfo?.phoneNumber ?? '-'}
          </Typography>
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            성별
          </Typography>
          <Typography
            style={{ color: theme.colors.label.normal }}
            variant="body1Normal"
          >
            {userInfo?.gender ?? '-'}
          </Typography>
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            권한
          </Typography>
          <Chip
            color="neutral"
            size="large"
            text={userInfo?.role}
            variant="weak"
          />
        </Wrapper>
        <Wrapper>
          <Typography
            style={{ color: theme.colors.label.alternative }}
            variant="body1Normal"
          >
            가입일
          </Typography>
          <Typography
            style={{ color: theme.colors.label.normal }}
            variant="body1Normal"
          >
            {userInfo?.joinDate ?? '-'}
          </Typography>
        </Wrapper>
      </div>
    </div>
  );
};

export default MemberBasicInfo;

const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  gap: 24px;
  align-items: center;

  span:first-child {
    width: ${({ width }) => (width ? width : '64px')};
  }
`;
