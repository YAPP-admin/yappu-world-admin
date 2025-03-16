import Chip from '@compnents/commons/Chip';
import TextInput from '@compnents/commons/TextInput';
import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const MemberBasicInfo: FC = () => {
  return (
    <div
      style={{
        flex: '1 0 0',
        borderRight: `1px solid ${theme.colors.lineNormal.normal}`,
      }}
    >
      <Typography text="기본 정보" variatnt="heading2Bold" />
      <div className="wrapper">
        <Wrapper>
          <Typography
            text="이름"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            text="김현정"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.normal }}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            text="이메일"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            text="cowguswjd@gmail.com"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.normal }}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            text="전화번호"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            text="010-6407-9715"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.normal }}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            text="성별"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            text="여자"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.normal }}
          />
        </Wrapper>
        <Wrapper>
          <Typography
            text="권한"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Chip
            text="활동회원"
            chipColor="neutral"
            chipSize="large"
            chipStyle="weak"
          />
        </Wrapper>
        <Wrapper>
          <Typography
            text="가입일"
            variatnt="body1Normal"
            style={{ color: theme.colors.label.alternative }}
          />
          <Typography
            text="2025.02.02"
            variatnt="body1Normal"
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
