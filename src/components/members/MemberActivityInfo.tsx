import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const MemberActivityInfo: FC = () => {
  return (
    <div style={{ width: '286px' }}>
      <Typography text="활동 정보" variatnt="heading2Bold" />
      <div className="wrapper">
        <Wrapper width="100px">
          <Typography
            text="기수"
            variatnt="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
            }}
          />
          <Typography
            text="직군"
            variatnt="body1Normal"
            style={{
              color: theme.colors.label.alternative,
              fontWeight: 600,
            }}
          />
        </Wrapper>
        <Wrapper width="100px">
          <Typography
            text="24기"
            variatnt="body1Normal"
            style={{
              color: theme.colors.label.normal,
            }}
          />
          <Typography
            text="PM"
            variatnt="body1Normal"
            style={{
              color: theme.colors.label.normal,
            }}
          />
        </Wrapper>
        <Wrapper width="100px">
          <Typography
            text="25기"
            variatnt="body1Normal"
            style={{
              color: theme.colors.label.normal,
            }}
          />
          <Typography
            text="Web"
            variatnt="body1Normal"
            style={{
              color: theme.colors.label.normal,
            }}
          />
        </Wrapper>
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
    width: ${({ width }) => (width ? width : '64px')};
  }
`;
