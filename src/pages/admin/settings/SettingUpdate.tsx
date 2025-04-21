import Refresh from '@assets/Refresh';
import IconButton from '@compnents/Button/IconButton';
import FlexBox from '@compnents/commons/FlexBox';
import Typography from '@compnents/commons/Typography';
import CompletePopup from '@compnents/popup/CompletePopup';
import ConfirmPopup from '@compnents/popup/ConfirmPopup';
import UpdateVersion from 'features/setting/components/UpdateVersion';
import { FC } from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

const SettingUpdate: FC = () => {
  return (
    <>
      <Container>
        <Typography variant="title2Bold">강제 업데이트</Typography>
        <FlexBox gap={24} width="fit-content">
          <FlexBox gap={16}>
            <Typography variant="heading2Bold">현재 릴리즈 버전</Typography>
            <Typography variant="heading2Bold" color="primary-normal">
              1.0.2
            </Typography>
          </FlexBox>
          <FlexBox gap={8} align="center">
            <Typography variant="label1Normal" color="label-assistive">
              2025.03.05 12:00기준
            </Typography>
            <IconButton variant="outlined" size="custom">
              <Refresh size="11.4" />
            </IconButton>
          </FlexBox>
        </FlexBox>
        <Divider />
        <Wrapper>
          <Typography variant="body1Normal">버전 내역</Typography>
          <UpdateVersion
            date={'2024-04-14'}
            version="1.14"
            onClick={() => console.log('a')}
          />
        </Wrapper>
      </Container>
      {true && (
        <ConfirmPopup
          comment=""
          title="강제 업데이트를 진행합니다."
          confirmActionLabel="업데이트 진행"
          onConfirmAction={() => console.log(true)}
          onCancelAction={() => console.log(false)}
        />
      )}
      {true && (
        <CompletePopup
          buttonText="확인"
          comment={`1.1.4 버전으로 강제업데이트 정상 진행되었습니다`}
          title="업데이트 완료"
          onClose={() => console.log(false)}
        />
      )}
    </>
  );
};

export default SettingUpdate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 40px;

  span {
    white-space: nowrap;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.lineNormal.normal};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;
