import Typography from '@compnents/commons/Typography';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import GenerateInfo from './GenerateInfo';
import { UserDetail } from '@compnents/popup/MemberDetailPopup';

interface Props {
  userData: UserDetail;
}

const MemberActivityInfo: FC<Props> = (props) => {
  const { userData } = props;
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
        {userData.activityUnits?.map((el, idx) => (
          <GenerateInfo
            key={idx}
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
