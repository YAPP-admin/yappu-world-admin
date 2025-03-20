import Chip from '@compnents/commons/Chip';
import Typography from '@compnents/commons/Typography';
import { UserDetailRes } from 'apis/user/types';
import { FC } from 'react';
import styled from 'styled-components';
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
      <Typography children="기본 정보" variant="heading2Bold" />
      <div className="wrapper">
        <Wrapper>
          <Typography
            children="이름"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            children={userInfo?.name}
            variant="body1Normal"
            style={{ color: theme.colors.label.normal }}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="이메일"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            children={userInfo?.email}
            variant="body1Normal"
            style={{ color: theme.colors.label.normal }}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="전화번호"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            children={userInfo?.phoneNumber ?? '-'}
            variant="body1Normal"
            style={{ color: theme.colors.label.normal }}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="성별"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            children={userInfo?.gender ?? '-'}
            variant="body1Normal"
            style={{ color: theme.colors.label.normal }}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="권한"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Chip
            text={userInfo?.role.label}
            color="neutral"
            size="large"
            variant="weak"
          />
        </Wrapper>
        <Wrapper>
          <Typography
            children="가입일"
            variant="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            children={userInfo?.joinDate ?? '-'}
            variant="body1Normal"
            style={{ color: theme.colors.label.normal }}
          />
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
